const catchAsync = require("./../utils/catchAsync");
const User = require("../models/userModel");
const axios = require("axios");
const PlaylistService = require("./../services/playlistService")
const PlaylistServiceInstance = new PlaylistService()
const TrackService = require("../services/trackService")
const TrackServiceInstance = new TrackService()
const UserService = require("../services/userService")
const UserServiceInstance = new UserService()
const PresetService = require('../services/presetService')
const PresetServiceInstance = new PresetService()

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
    const userSourcePlaylists = req.user.likesSources
    let processedSpotifyPlaylists = []
    spotifyPlaylists.map((spotifyPlaylist, i) => {
        const found = userSourcePlaylists.find(userSourcePlaylist =>
            userSourcePlaylist.spotifyId === spotifyPlaylist.id)

        if (found)
            spotifyPlaylist = {...spotifyPlaylist, isLikesPoolSource: true}
        else
            spotifyPlaylist = {...spotifyPlaylist, isLikesPoolSource: false}

        processedSpotifyPlaylists.push(spotifyPlaylist)
    })

    req.spotifyPlaylists = processedSpotifyPlaylists
    req.message = `${response.data.items.length} Spotify playlists retrieved`
    next()
})

exports.getSpotifyUserLikes = catchAsync(async (req, res, next) => {

    const response = await axios({
        method: 'GET',
        url: 'https://api.spotify.com/v1/me/tracks',
        headers: {
            'Authorization': `Bearer ${req.user.accessToken}`
        },
        params: {
            offset: (req.query.page - 1) * req.query.limit ,
            limit: req.query.limit
        }
    })

    const userSourcePlaylists = req.user.likesSources
    let found = userSourcePlaylists.find(userSourcePlaylist =>
        userSourcePlaylist === 'Liked Songs')

    //DELETE THIS LINE
    found = !!found

    req.spotifyLikes = response.data.items
    req.total = response.data.total
    req.isLikesPoolSource = found
    req.message = `${response.data.items.length} Spotify likes retrieved`
    next()
})

exports.getLikes = catchAsync(async (req, res, next) => {

    const likesPool = await PlaylistServiceInstance.PlaylistMongooseService.findById(
        req.user.likesPool)

    const likeIds = likesPool.tracks.slice(
        req.query.offset, req.query.offset + req.query.limit)

    const tracks = await TrackServiceInstance.TrackMongooseService.aggregate([
        {$match: {_id: {$in: likeIds}}},
        {$lookup: {
                from: 'artists',
                localField: 'artists',
                foreignField: '_id',
                as: "artists"
            }},
        {$lookup: {
                from: 'tags',
                localField: 'tags',
                foreignField: '_id',
                as: "tags"
            }},
        {$lookup: {
                from: 'albums',
                localField: 'album',
                foreignField: '_id',
                as: "album"
            }}
    ])

    const message = `Retrieved ${tracks.length} tracks from likes pool`
    console.log(`📤 Response with message "${message}" sent to the client.`)
    console.log('- - - - - - - © Selecta - - - - - - -')

    res.status(200).json({
        status: 'success',
        message: message,
        likedTracks: tracks
    })
})

exports.getLikesSources = catchAsync(async (req, res, next) => {

    const likesSources = await UserServiceInstance.getLikesSources(
        req.user.likesSources)

    // const likesSources = req.user.likesSources

    const message = `Found ${likesSources.length} likes source(s)`
    console.log(`📤 Response with message "${message}" sent to the client.`)
    console.log('- - - - - - - © Selecta - - - - - - -')

    res.status(200).json({
        status: 'success',
        message: message,
        likesSources: likesSources
    })
})

exports.addLikesSource = catchAsync(async (req, res, next) => {

    let playlistDetails
    if (req.query.spotifyId === 'likes')
        playlistDetails = {name: 'likes'}
    else
        playlistDetails = await PlaylistServiceInstance.getSpotifyPlaylistDetails(
            req.user.accessToken, req.query.spotifyId)

    let tracksData
    if (req.query.spotifyId === 'likes')
        tracksData = await UserServiceInstance.getAllUserLikesFromSpotify(req.user.accessToken)
    else
        tracksData = await PlaylistServiceInstance.getAllPlaylistTracksFromSpotify(
            req.user.accessToken, req.query.spotifyId, playlistDetails.name)

    const tracks = await TrackServiceInstance.findOrCreateTracks(tracksData)

    const trackIds = tracks.map(track => track._id)

    const playlistData = {
        spotifyId: req.query.spotifyId,
        name: playlistDetails.name,
        description: playlistDetails.description,
        coverUrl: playlistDetails.images[0].url,
        type: 'likes-source',
        trackAmount: tracks.length,
        tracks: trackIds
    }

    const playlist = await PlaylistServiceInstance.createSelectaPlaylist(playlistData)

    await UserServiceInstance.addLikesSource(playlist._id, req.user)
    await UserServiceInstance.addTracksToLikesPool(trackIds, req.user.likesPool)

    const message = `Added playlist "${playlistDetails.name}" to ${req.user.displayName}'s likes sources`

    console.log(`📤 Message "${message}" sent to the client.`)
    console.log('- - - - - - - © Selecta - - - - - - -')

    res.status(204).json({
        status: 'success',
        message: message
    })
})

exports.deleteLikesSource = catchAsync(async (req, res, next) => {

    const playlist = await PlaylistServiceInstance.PlaylistMongooseService.findOne(
        {spotifyId: req.query.spotifyId})



    await UserServiceInstance.deleteLikesSource(playlist._id, req.user)
    await UserServiceInstance.deleteTracksFromLikesPool(playlist.tracks, req.user.likesPool)

    await PlaylistServiceInstance.deleteSelectaPlaylist(playlist._id)

    const message = `Deleted playlist "${playlist.name}" from ${req.user.displayName}'s likes sources`

    console.log(`📤 Message "${message}" sent to the client.`)
    console.log('- - - - - - - © Selecta - - - - - - -')

    res.status(200).json({
        status: 'success',
        message: message
    })
})

exports.getUserPresets = catchAsync(async (req, res, next) => {

    const presetIds = req.user.presets.slice(req.query.offset, req.query.offset + req.query.limit)

    const presets = await PresetServiceInstance.PresetMongooseService.find({
        _id: {$in: presetIds}}, null, {lastUse: -1})
    presets.map(preset => preset.authorDisplayName = !preset.default ? req.user.displayName : 'Selecta')

    const message = `Retrieved ${presets.length} preset(s)`

    console.log(`📤 Message "${message}" sent to the client.`)
    console.log('- - - - - - - © Selecta - - - - - - -')

    res.status(200).json({
        status: 'success',
        message: message,
        presets: presets
    })
})

exports.addPresetToUsersPool = catchAsync(async (req, res, next) => {


    await UserServiceInstance.addPresetToPresetPool(req.query, req.user._id)

    const message = `Added ${req.query.name} to the user's preset pool`

    console.log(`📤 Message "${message}" sent to the client.`)
    console.log('- - - - - - - © Selecta - - - - - - -')

    res.status(200).json({
        status: 'success',
        message: message
    })
})