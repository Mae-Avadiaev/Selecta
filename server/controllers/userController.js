const catchAsync = require("./../utils/catchAsync");
const User = require("../models/userModel");
const axios = require("axios");

exports.getMe = catchAsync(async (req, res, next) => {

    // hide sensitive server info
    req.user.accessToken = undefined
    req.user.refreshToken = undefined
    req.user.accessTokenExpiresBy = undefined

    res.status(200).json({
        status: 'success',
        data: req.user
    })
})

exports.getSeeds = catchAsync(async (req, res, next) => {
    req.seeds = (await User.findOne({_id: req.user._id}).populate('seeds')).seeds
    req.message = `${req.seeds.length} seed playlists retrieved`
    next()
})

exports.getSpotifyAll = catchAsync(async (req, res, next) => {

    const response = await axios({
        method: 'GET',
        url: 'https://api.spotify.com/v1/me/playlists',
        headers: {
            'Authorization': `Bearer ${req.user.accessToken}`
        }
    })

    console.log(response.data)

    req.spotifyPlaylists = response.data.items
    req.message = `${response.data.items.length} Spotify playlists retrieved`
    next()
})

exports.getLikesPool = catchAsync(async (req, res, next) => {

    next()
})