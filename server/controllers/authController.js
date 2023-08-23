const catchAsync = require("./../utils/catchAsync");
const queryString = require("node:querystring");
const axios = require("axios");
const SpotifyWebApi = require("spotify-web-api-node");
const User = require("../models/userModel");
const {Schema} = require("mongoose");
const Playlist = require("../models/playlistModel");
const jwt = require('jsonwebtoken');
const {promisify} = require('util');
const AppError = require("../utils/appError");
const mongodb = require("mongodb");
const fs = require("fs");
const crypto = require('crypto');
// const {encrypt} = require("../utils/encryption");
const app = require("../app");
const bcrypt = require('bcrypt');
const aes256 = require("aes256");
const Category = require("../models/tagCategoryModel");
const Process = require("process");
const Preset = require("../models/presetModel");
const {defaultPresetContent} = require("../initial_configs");
// const {defaultPresetContent} = require("../config");
// const aes256 = require('aes256');

const scope = 'playlist-read-private playlist-modify-public playlist-modify-private ugc-image-upload streaming user-read-email user-read-private user-read-playback-state'

exports.requestAuthorization = catchAsync(async (req, res, next) => {

    res.redirect('https://accounts.spotify.com/authorize?' + queryString.stringify({
        client_id: process.env.CLIENT_ID,
        response_type: 'code',
        redirect_uri: process.env.REDIRECT_URI_DECODED,
        scope: scope
    }))
})

const requestSpotifyAccessToken = async (req, res, next) => {

    return axios.post(
        "https://accounts.spotify.com/api/token",
        queryString.stringify({
            grant_type: "authorization_code",
            code: req.query.code,
            redirect_uri: process.env.REDIRECT_URI_DECODED,
        }),
        {
            headers: {
                Authorization: "Basic " + process.env.BASE64_AUTHORIZATION,
                "Content-Type": "application/x-www-form-urlencoded",
            },
        }
    ).catch(next)
}

const signToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
};

const setToken = (user, spotifyUserData, req, res) => {

    const token = signToken(user._id);

    res.cookie('jwt', token, {
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
        secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
        domain: null,
    })
}

exports.requestAccess = catchAsync(async (req, res, next) => {

    const response = await requestSpotifyAccessToken(req, res, next)

    // getting or creating a user, putting encrypted access token to db
    const spotifyApi = new SpotifyWebApi()
    spotifyApi.setAccessToken(response.data.access_token)

    // calculate expiration time
    const accessTokenExpiresBy = new Date().getTime() + (response.data.expires_in * 1000)

    const encryptedRefreshToken = aes256.encrypt(process.env.SECRET_KEY, response.data.refresh_token);

    const spotifyUserData = (await spotifyApi.getMe()).body

    let user = await User.findOne({spotifyId: spotifyUserData.id})
    if (!user) {
        //CREATE USER
        const defaultPresets = await Preset.create(defaultPresetContent)
        const defaultPresetsIds = defaultPresets.map(preset => preset._id)

        user = await User.create({
            spotifyId: spotifyUserData.id,
            avatarUrl: spotifyUserData.images[0].url,
            displayName: spotifyUserData.display_name,
            accessToken: response.data.access_token,
            accessTokenExpiresBy: accessTokenExpiresBy,
            refreshToken: encryptedRefreshToken,
            defaultPresets: defaultPresetsIds,
        })

        // log
        console.log(`👤 New user created for ${spotifyUserData.display_name}`)

    }

    await User.findOneAndUpdate({_id: user._id}, {
        accessToken: response.data.access_token,
        accessTokenExpiresBy: accessTokenExpiresBy,
        refreshToken: encryptedRefreshToken
    })

    // save the user's ID in the JWT and save JWT in res.cookies
    setToken(user, spotifyUserData, req, res)

    // log
    console.log('🔐 Access token received from Spotify, saved in DB; JWT sent to client')

    res.redirect(`${process.env.CLIENT_ADDRESS}/log-in`)
})

exports.protect = catchAsync(async (req, res, next) => {

    // 1) Get token and check of it's there
    let token
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer'))
        token = req.headers.authorization.split(' ')[1];
    else if (req.cookies.jwt)
        token = req.cookies.jwt;

    if (!token)
        return next(new AppError('You are not logged in! Please log in with Spotify', 401));

    // 2) Verify token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    // 3) Check if user still exists
    const currentUser = await User.findById(decoded.id).populate('seeds');
    if (!currentUser) {
        return next(new AppError('The user belonging to this token does no longer exist.', 401)
        )
    }

    //check Spotify token
    if (currentUser.accessTokenExpiresBy <= new Date().getTime()) {

        const refreshToken = aes256.decrypt(process.env.SECRET_KEY, currentUser.refreshToken)

        const spotifyApi = new SpotifyWebApi({
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            redirectUri: process.env.REDIRECT_URI_DECODED
        })
        await spotifyApi.setRefreshToken(refreshToken)
        const response = await spotifyApi.refreshAccessToken()

        const accessTokenExpiresBy = new Date().getTime() + (response.body.expires_in * 1000)

        const encryptedRefreshToken = response.body.refresh_token ?
            aes256.encrypt(process.env.SECRET_KEY, response.body.refresh_token) : currentUser.refreshToken

        await User.findOneAndUpdate({_id: currentUser._id}, {
            accessToken: response.body.access_token,
            accessTokenExpiresBy: accessTokenExpiresBy,
            refreshToken: encryptedRefreshToken
        })

        // log
        console.log('🔑 Access token refreshed')

        currentUser.accessToken = response.body.access_token
    }

    //log
    console.log(`👍 %cAccess granted for %c${currentUser.displayName}`, 'color: yellow', 'color: green')

    // GRANT ACCESS TO PROTECTED ROUTE
    req.user = currentUser;
    res.locals.user = currentUser;
    next();
})

exports.logOut = catchAsync(async (req, res, next) => {

    //log
    console.log(`🔒 Removed JWT token`)

    res.cookie('token', 'none', {
        expires: new Date(Date.now() + 5 * 1000),
        httpOnly: true,
    })
    res.status(200)
        .json({ success: true, message: 'User logged out successfully' })
})