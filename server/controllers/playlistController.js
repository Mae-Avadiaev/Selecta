const catchAsync = require("./../utils/catchAsync");
const Playlist = require("./../models/playlistModel")
const app = require("./authController");
const SpotifyWebApi = require("spotify-web-api-node");
const {decrypt} = require("../utils/encryption");
const fs = require("fs");
const aes256 = require("aes256");
const axios = require("axios");
const User = require("../models/userModel");
const Track = require("../models/trackModel");
// const key = require("../key.txt")

//Working
// const accessToken = aes256.decrypt(process.env.SECRET_KEY, req.user.accessToken)
// const api_url = `https://api.spotify.com/v1/playlists/${creationResponse.body.id}/images`;
// const response = await axios.put(api_url, cover, {
//     headers: {
//         'Authorization': `Bearer ${accessToken}`,
//         'Content-Type': 'image/jpeg'
//     }
// }).catch((err) => console.log(err))

// const api_url = `https://api.spotify.com/v1/users/${req.user.spotifyId}/playlists`;
// const creationResponse = await axios.post(api_url, {
//     name: req.body.name,
//     description: req.body.description ? req.body.description : '',
//     public: req.body.public ? req.body.public : false
// }, {
//     headers: {
//         'Authorization': `Bearer ${accessToken}`,
//         'Content-Type': 'image/jpeg'
//     }
// })


exports.createPlaylist = catchAsync(async (req, res, next) => {

    // set spotifyAPI package
    const spotifyApi = new SpotifyWebApi()
    // spotifyApi.setAccessToken(aes256.decrypt(process.env.SECRET_KEY, req.user.accessToken))
    spotifyApi.setAccessToken(req.user.accessToken)

    // create playlist in Spotify
    let creationResponse
    if (req.body.type !== 'likes pool') {
        creationResponse = await spotifyApi.createPlaylist(
            req.body.name,
            {
                'description': req.body.description ? req.body.description : '',
                'public': false
            }
        )

        // set cover
        if (req.body.coverUrl) {

            // fetch compressed cover
            const coverResponse = await axios({
                url: req.body.coverUrl,
                method: 'GET',
                responseType: 'arraybuffer'
            })

            //convert cover to base64
            const cover = Buffer.from(coverResponse.data).toString('base64')

            // send to the API
            const coverUpdateResponse = await spotifyApi.uploadCustomPlaylistCoverImage(
                creationResponse.body.id,
                cover
            )
        }
    }

    //Create playlist in DB
    const playlist = await Playlist.create({
        spotifyId: (creationResponse && creationResponse.body.id) ? creationResponse.body.id : undefined,
        name: req.body.name,
        description: req.body.description ? req.body.description : undefined,
        coverUrl: req.body.coverUrl ? req.body.coverUrl : undefined,
        public: req.body.public ? req.body.public : false,
        type: req.body.type ? req.body.type : undefined,
        rules: req.body.rules ? req.body.rules : undefined,
        orderNumber: req.body.orderNumber
    })

    // console.log(playlist.spotifyId)
    if (req.body.type === 'seeds pool') {
        await User.findOneAndUpdate({_id: req.user._id}, {seedsPool: playlist.spotifyId} )
    } else if (req.body.type === 'queue') {
        await User.findOneAndUpdate({_id: req.user._id}, { $push: {queues: playlist.spotifyId}})
    } else if (req.body.type === 'likes pool') {
        await User.findOneAndUpdate({_id: req.user._id}, {likesPool: playlist._id})
    }

    res.status(201).json({
        status: 'success',
        message: 'Playlist created in your Spotify!'
    })
})

exports.getPlaylist = catchAsync(async (req, res, next) => {

    const spotifyApi = new SpotifyWebApi()
    spotifyApi.setAccessToken(req.user.accessToken)

    let playlistId
    if (!req.query.type)
        playlistId = req.user.seedsPool
    else if (req.query.type === 'seeds pool')
        playlistId = req.user.seedsPool
    else
        playlistId = req.query.id

    // get playlist from Spotify
    const response = await spotifyApi.getPlaylistTracks(
        playlistId,
        {
            limit: req.query.limit,
            fields: 'items'
        }
    )

    // distinct new tracks
    const spotifyTracks = response.body.items
    const playlist = await Playlist.findOne({spotifyId: playlistId})
    const oldTracks = playlist.tracks

    // add to db
    let allTracks = []
    for (let i = 0; i < spotifyTracks.length; i++) {
        const trackFound = await Track.findOne({spotifyId: spotifyTracks[i].track.id})
        if (trackFound) {
            await trackFound.updateOne({dateAdded: spotifyTracks[i].added_at})
            allTracks.push(trackFound)
        } else {

            const artistsArray = spotifyTracks[i].track.artists.map((artist =>
                artist.name))
            const artistsString = artistsArray.join('-').replace(' ', '-')
            const songFullTitle = (spotifyTracks[i].track.name.replace(' ', '-') + '-' + artistsString)
                .replace(/[^a-zA-Z0-9-]/g, '')

            const dbTrack = await Track.create({
                spotifyId: spotifyTracks[i].track.id,
                dateAdded: spotifyTracks[i].added_at,
                songFullTitle: songFullTitle
            })
            allTracks.push(dbTrack)
        }
    }

    console.log(allTracks, 'ALL')
    const newTracks = allTracks.filter(({spotifyId: id1}) =>
        !oldTracks.some(({spotifyId: id2}) => id1 === id2))
    console.log(newTracks, 'new')
    const deletedTracks = oldTracks.filter(({spotifyId: id1}) =>
        !allTracks.some(({spotifyId: id2}) => id1 === id2))
    console.log(deletedTracks, 'dels')

    await Playlist.findOneAndUpdate({spotifyId: playlistId}, {$set: {tracks: allTracks}})

    req.allTracks = allTracks
    req.newTracks = newTracks
    req.deletedTracks = deletedTracks

    next()
})

exports.sendPlaylist = catchAsync(async (req, res, next) => {

    res.status(201).json({
        status: 'success',
        message: 'New tracks synchronized',
        data: {allTracks: req.allTracks, newTracks: req.newTracks, deletedTracks: req.deletedTracks}
    })
})