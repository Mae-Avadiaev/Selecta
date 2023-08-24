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

exports.getSpotifyUserPlaylists = catchAsync(async (req, res, next) => {

    const response = await axios({
        method: 'GET',
        url: 'https://api.spotify.com/v1/me/playlists',
        headers: {
            'Authorization': `Bearer ${req.user.accessToken}`
        },
        params: {
            offset: (req.query.page - 1) * req.query.limit ,
            limit: req.query.limit
        }
    })

    const spotifyPlaylists = response.data.items
    const userSourcePlaylists = req.user.likesPool.playlists
    let processedSpotifyPlaylists = []
    spotifyPlaylists.map((spotifyPlaylist, i) => {
        const found = userSourcePlaylists.find(userSourcePlaylist =>
            userSourcePlaylist.spotifyId === spotifyPlaylist.id)

        // console.log(spotifyPlaylist, '1111111111')

        if (found)
            spotifyPlaylist = {...spotifyPlaylist, isLikesPoolSource: true}
        else
            spotifyPlaylist = {...spotifyPlaylist, isLikesPoolSource: false}

        processedSpotifyPlaylists.push(spotifyPlaylist)
    })
    // console.log(response.data)
    // console.log(req.query.page)
    // console.log(req.query.limit)

    req.spotifyPlaylists = processedSpotifyPlaylists
    req.message = `${response.data.items.length} Spotify playlists retrieved`
    next()
})

exports.getLikesPool = catchAsync(async (req, res, next) => {

    next()
})