const catchAsync = require("./../utils/catchAsync");
const User = require("../models/userModel");
const axios = require("axios");
const PlaylistService = require("./../services/playlistService")
const PlaylistServiceInstance = new PlaylistService()
const TrackService = require("../services/trackService")
const TrackServiceInstance = new TrackService()
const UserService = require("../services/userService")
const UserServiceInstance = new UserService()

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

    const userSourcePlaylists = req.user.likesPool.playlists
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

exports.getLikesSources = catchAsync(async (req, res, next) => {

    const likesSources = await UserServiceInstance.getLikesSources(
        req.user.likesPool.playlists)
    const message = `Found ${likesSources.length} likes sources`

    console.log(`📤 Response with message "${message}" sent to the client.`)
    console.log('- - - - - - - © Selecta - - - - - - -')

    res.status(200).json({
        status: 'success',
        message: message,
        likesSources: likesSources
    })
})

exports.patchLikes = catchAsync(async (req, res, next) => {

    // console.log(req.query.spotifyId, 'spot')

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

    const tracks = await Promise.all(tracksData.map(async (track) =>
        await TrackServiceInstance.findOrCreateTrack(track)))

    console.log(`☑️ Found or created ${tracks.length} tracks`)

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

    const message = `Added playlist "${playlistDetails.name}" to ${req.user.displayName}'s likes sources`

    console.log(`📤 Message "${message}" sent to the client.`)
    console.log('- - - - - - - © Selecta - - - - - - -')

    res.status(204).json({
        status: 'success',
        message: message
    })
})