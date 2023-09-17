const catchAsync = require("./../utils/catchAsync");
const queryString = require("node:querystring");
const SpotifyWebApi = require("spotify-web-api-node");
const User = require("../models/userModel");
const jwt = require('jsonwebtoken');
const {promisify} = require('util');
const AppError = require("../utils/appError");
const aes256 = require("aes256");
const AuthService = require("../services/authService");
const AuthServiceInstance = new AuthService()

const scope = 'playlist-read-private playlist-modify-public playlist-modify-private ugc-image-upload streaming user-read-email user-read-private user-read-playback-state user-library-read'

exports.requestAuthorization = catchAsync(async (req, res, next) => {

    res.redirect('https://accounts.spotify.com/authorize?' + queryString.stringify({
        client_id: process.env.CLIENT_ID,
        response_type: 'code',
        redirect_uri: process.env.REDIRECT_URI_DECODED,
        scope: scope
    }))
})

exports.requestAccess = catchAsync(async (req, res, next) => {

    const token = await AuthServiceInstance.grantAccessToken(req.query.code)

    res.cookie('jwt', token, {
        expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
        secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
        domain: null,
    })

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
    const currentUser = await User.findById(decoded.id);
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
    console.log(`👍 Access granted for ${currentUser.displayName}`)

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

    res.status(200).json({ success: true, message: 'User logged out successfully' })
})