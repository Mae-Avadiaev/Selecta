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
// const aes256 = require('aes256');

// Spotify scopes
const scope = 'playlist-modify-public playlist-modify-private ugc-image-upload streaming user-read-email user-read-private user-read-playback-state'

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
        user = await User.create({
            spotifyId: spotifyUserData.id,
            avatarUrl: spotifyUserData.images[0].url,
            displayName: spotifyUserData.display_name,
            accessToken: response.data.access_token,
            accessTokenExpiresBy: accessTokenExpiresBy,
            refreshToken: encryptedRefreshToken
        })
    }

    await User.findOneAndUpdate({_id: user._id}, {
        accessToken: response.data.access_token,
        accessTokenExpiresBy: accessTokenExpiresBy,
        refreshToken: encryptedRefreshToken
    })

    // save the user's ID in the JWT and save JWT in res.cookies
    setToken(user, spotifyUserData, req, res)

    // log
    console.log('🔐 Access token received, saved in DB; JWT sent via Cookie')

    res.redirect('http://localhost:3001/setup')
})

exports.getMe = catchAsync(async (req, res, next) => {

    res.status(200).json({
        status: 'success',
        data: req.user
    })
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

        currentUser.refreshToken = response.body.refresh_token
    }

    //log
    console.log(`👍 %cAccess granted for %c${currentUser.displayName}`, 'color: yellow', 'color: green')

    // GRANT ACCESS TO PROTECTED ROUTE
    req.user = currentUser;
    res.locals.user = currentUser;
    next();
})


//
//
// const createNewUser = async (spotifyUserData) => {
//
//     //Create blanc user
//     // const user = User.create({
//     //     spotifyId: spotifyUserData.id,
//     //     accessToken: response.data.access_token,
//     // })
//
// //Create playlist in DB
//     const playlist = await Playlist.create({
//
//     })
//
//     //Create default queues
//     let queueBrowserFolderContent = []
//     for (let i = 0; i < 8; i++) {
//
//         let name
//         let rule
//         if (i === 0) {
//             name = '125+'
//             rule = 'bpm_>=_125'
//         } else if (i === 7) {
//             name = '95-'
//             rule = 'bpm_<_95'
//         } else {
//             name = (125 - 5 * i)
//             rule = 'bpm_range_' + name + '_' + name + 5
//             name = name.toString()
//         }
//
//         const newQueue = await Playlist.create({
//             name: name,
//             editors: [user._id],
//             type: 'queue',
//             rules: rule
//         })
//
//         queueBrowserFolderContent.push({
//             id: newQueue._id,
//             customPosition: i
//         })
//     }
//
//     //Create default likes playlist
//     const dateLetters = new Date().toDateString().split(' ')
//     const dateInts = new Date().toLocaleDateString().split('/')
//     const name = date[1] + ' ' + date[3].substring(2)
//     const date = new Date()
//     let datePlusOneMonth = date.setMonth(date.getMonth() + 1)
//     datePlusOneMonth = datePlusOneMonth.toLocaleDateString().split('/')
//
//     const defaultLikesPlaylist = db.Playlist.create({
//         name: name,
//         editors: [user._id],
//         type: 'likes',
//         rules: 'date_range_1/' + dateInts[1] + '/' + dateInts[2] + '_1/' +
//             datePlusOneMonth[1] + '/' + datePlusOneMonth[2]
//     })
//
//     //Create default playlists and folders
//     const mainCollectionPlaylist = db.Playlist.create({
//         name: '_collection',
//         editors: [user._id],
//         type: 'collection playlist',
//         rules: 'all'
//     })
//
//     const defaultPlaylistNamesAndRules = [
//         {name: "⚪️ All", rule: ''},
//         {name: "🟣 20's", rule: '&decade_=_20'},
//         {name: "🔴 10's", rule: '&decade_=_10'},
//         {name: "🟠 00's", rule: '&decade_=_00'},
//         {name: "🟡 90's", rule: '&decade_=_90'},
//         {name: "🟢 80's", rule: '&decade_=_80'},
//         {name: "🔵 70's", rule: '&decade_=_70'},
//         {name: "🟤 Early", rule: '&decade_<_70'}
//     ]
//
//     const defaultFolderNamesAndRules = [
//         {name: '🔺 Other (135-190)', playlistsRule: 'bpm_range_135_190'},
//         {name: '💥 Rave (130-135)', playlistsRule: 'bpm_range_130_135'},
//         {name: '⚡️ Dance (125-130)', playlistsRule: 'bpm_range_125_130'},
//         {name: '🌐 Slow-Dance (120-125)', playlistsRule: 'bpm_range_120_125'},
//         {name: '🍸 Pre-party (115-120)', playlistsRule: 'bpm_range_115_120'},
//         {name: '🗣 Socialise (110-115)', playlistsRule: 'bpm_range_110_115'},
//         {name: '🔥 Warm-up (105-110)', playlistsRule: 'bpm_range_105_110'},
//         {name: '🎱 Vibe to Hip Hop (75-100)', playlistsRule: 'bpm_range_75_100'},
//         {name: '🍽 Sit (100-105)', playlistsRule: 'bpm_range_100_105'},
//         {name: '🏖 Lounge (95-103)', playlistsRule: 'bpm_range_95_103'},
//         {name: '💻 Do Your Thing (90-95)', playlistsRule: 'bpm_range_90_95'},
//         {name: '👂 Be All Ears (80-90)', playlistsRule: 'bpm_range_80_90'},
//         {name: '💃 Move to Latino Rhythms (70-75)', playlistsRule: 'bpm_range_70_75'},
//         {name: '🪶 Relax (70-95)', playlistsRule: 'bpm_range_70_95'},
//         {name: '🕉 Meditate (75-80)', playlistsRule: 'bpm_range_75_80'},
//         {name: '🔻 Other (45-80)', playlistsRule: 'bpm_range_45_80'}
//     ]
//
//     let collectionBrowserFolderContent = []
//     for (const [i, folder] in defaultFolderNamesAndRules.entries()) {
//
//         let folderContent = []
//         for (const [j, playlist] in defaultPlaylistNamesAndRules.entries()) {
//             const newPlaylist = await db.Playlist.create({
//                 name: playlist.name,
//                 editors: [user._id],
//                 type: 'smart playlist',
//                 rules: folder.playlistsRule + playlist.rule,
//             })
//
//             folderContent.push({
//                 id: newPlaylist._id,
//                 customPosition: j
//             })
//         }
//
//         const newFolder = await db.Folder.create({
//             name: folder.name,
//             type: 'collection folder',
//             children: [{...folderContent}]
//         })
//
//         collectionBrowserFolderContent.push({
//             id: newFolder._id,
//             customPosition: i
//         })
//     }
//
//     //Create browser folders
//     //Create seed browser folder
//     const seedBrowserFolder = await db.BrowserFolder.create({
//         user: user._id,
//         type: 'seed browser folder',
//         children: [{
//             id: defaultSeedPool._id,
//             customPosition: 0
//         }]
//     })
//
//     //Create queue browser folder
//     const queueBrowserFolder = await db.BrowserFolder.create({
//         user: user._id,
//         type: 'queue browser folder',
//         children: [{...queueBrowserFolderContent}]
//     })
//
//     //Create likes browser folder
//     const likesBrowserFolder = await db.BrowserFolder.create({
//         user: user._id,
//         type: 'likes browser folder',
//         children: [likesfolder]
//     })
//
//     //Create collection browser folder
//     const collectionBrowserFolder = await db.BrowserFolder.create({
//         user: user._id,
//         type: 'collection browser folder',
//         children: [mainCollectionPlaylist, {...collectionBrowserFolderContent}]
//     })
//
//     //Create showcase browser folder
//     const showcaseBrowserFolder = await db.BrowserFolder.create({
//         user: user._id,
//         type: 'showcase browser folder',
//         children: []
//     })
//
//     db.User.updateOne(
//         {_id: user._id},
//         {$set: {
//             seedPoolBrowserFolder: seedBrowserFolder,
//             queueBrowserFolder: queueBrowserFolder,
//             collectionBrowserFolder: collectionBrowserFolder,
//             showcaseBrowserFolder: showcaseBrowserFolder
//         }}
//     )
// }