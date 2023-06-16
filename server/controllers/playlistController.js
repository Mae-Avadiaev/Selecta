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
const Album = require("../models/albumModel");
const Category = require("../models/tagCategoryModel");
const Tag = require("../models/tagModel");
const Artist = require("../models/artistModel");
const {findDecade, getRepresentationInSec, getCamelot, getClasic, getEnergyPoints, getVocals} = require("../utils/misc");
// const key = require("../key.txt")
const colorThief = require('colorthief')
const {Buffer} = require("buffer");

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

    // create playlist in Spotify
    let creationResponse
    if (!req.body.name.startsWith('_')) {

        // set spotifyAPI package
        const spotifyApi = new SpotifyWebApi()
        spotifyApi.setAccessToken(req.user.accessToken)

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

    if (req.body.type === 'seeds') {
        await User.findOneAndUpdate({_id: req.user._id}, {seeds: playlist._id})
    } else if (req.body.type === 'similar') {
        await User.findOneAndUpdate({_id: req.user._id}, {similar: playlist._id})
    } else if (req.body.type === 'queue') {
        await User.findOneAndUpdate({_id: req.user._id}, { $push: {queues: playlist._id}})
    } else if (req.body.type === 'likes') {
        await User.findOneAndUpdate({_id: req.user._id}, {likes: playlist._id})
    }

    //log
    console.log(`☑️ ${req.body.name} created`)

    res.status(201).json({
        status: 'success',
        message: 'Playlist created in your Spotify!'
    })
})

exports.getSpotifyPlaylist = catchAsync(async (req, res, next) => {

    const spotifyApi = new SpotifyWebApi()
    spotifyApi.setAccessToken(req.user.accessToken)

    let playlistId, playlist
    // if (!req.query.type)
    //     playlistId = await Playlist.findOne({_id: req.user.seeds}).spotifyId
    if (req.query.type === 'seeds') {
        playlist = await Playlist.findOne({_id: req.user.seeds})
        playlistId = playlist.spotifyId
    } else {
        playlistId = req.query.id
    }

    // get playlist from Spotify
    const response = await spotifyApi.getPlaylistTracks(
        playlistId,
        {
            limit: req.query.limit,
            fields: 'items'
        }
    )

    // log
    console.log(`▶️ Retrieved ${response.body.items.length} track(s) from ${playlist ? playlist.name : 'Spotify playlist'}`)

    req.spotifyData = response.body.items
    req.spotifyPlaylistId = playlistId
    next()
})

exports.getDBplaylist = catchAsync(async (req, res, next) => {

    let playlistId
    if (req.query.type === 'similar') {
        playlistId = req.user.similar
    }
    // console.log(req.query, 'query')
    // console.log(req.user)
    // console.log(playlistId, 'playlistId')
    const response = await Playlist.findOne({_id: playlistId}).populate({
        path: 'tracks',
        populate: [{
            path: 'artists'
        }, {
            path: 'album'
        }]
    })
    // console.log(response, 'response')

    if (req.allTracks && req.allTracks.length)
        req.allTracks = [...req.allTracks, ...response.tracks]
    else
        req.allTracks = response.tracks

    // log
    console.log(`▶️ Retrieved ${response.tracks.length} track(s) from ${response.name ? response.name : 'DB playlist'}`)
    next()
})


exports.findOrCreateTracksAndSaveDB = catchAsync(async (req, res, next) => {

// FIND OR CREATE TRACK
    let allTracks = [], allTracksIds = []
    let newTracks = [], newTracksIds =[], newTracksSpotifyIds = []

    if (!req.spotifyData) {
        // log
        console.log(`⏭ Skipped find or create tracks: tracks are not provided`)
        next()
        return
    }

    // console.log(req.spotifyData[0].id, "her")

    await Promise.all(req.spotifyData.map(async (track) => {

        if (!track.track) track = {track: track}

        const trackFound = await Track.findOne({spotifyId: track.track.id})
            .populate('artists').populate('tags').populate('album').exec()
        if (trackFound) {

            await trackFound.updateOne({dateAdded: track.added_at})
            allTracks.push(trackFound)
            allTracksIds.push(trackFound._id)


        } else {
        // CREATE TRACK
        // ALBUM
            // get release year
            let releaseYear
            if (track.track.album.release_date_precision === 'year')
                releaseYear = track.track.album.release_date
            else releaseYear = track.track.album.release_date.substring(0, 4)


            // find dominant colors
            // const response = await axios.get(dbAlbum.images[0].url, { responseType: 'arraybuffer' });
            const palette = await colorThief.getPalette(track.track.album.images[0].url, 3)
            // trackFound.album.dominantColors = palette

            // find or create album
            let dbAlbum = await Album.findOne({spotifyId: track.track.album.id})
            if (!dbAlbum) {
                dbAlbum = await Album.create({
                    spotifyId: track.track.album.id,
                    name: track.track.album.name,
                    spotifyHref: track.track.album.external_urls.spotify,
                    imageUrl: track.track.album.images[0].url,
                    releaseDate: track.track.album.release_date,
                    releaseYear: releaseYear,
                    label: track.track.album.label,
                    dominantColors: palette
                })
            }

            let tagsIds = []
            let tagsArray = []

        // TAGS
            // find or create genre category
            if (track.track.album.genres) {
                let genreCategory = await Category.findOne({name: 'Genre'})
                // if (!genreCategory)
                //     genreCategory = await Category.create({name: 'Genre'})

                // find or create genre tags
                await Promise.all(track.track.album.genres.map(async (genre) => {
                    let genreTag = await Tag.findOne({name: genre, category: genreCategory._id})
                    if (!genreTag) {
                        genreTag = await Tag.create({name: genre, category: genreCategory._id})
                    }
                }))
                tagsArray.push(genreTag)
                tagsIds.push(genreTag._id)
            }


            // find or create decade category
            let decadeCategory = await Category.findOne({name: 'Decade'})
            // if (!decadeCategory)
            //     decadeCategory = await Category.create({name: "Decade"})

            // find or create decade tag
            let decadeTag = await Tag.findOne({name: findDecade(releaseYear), category: decadeCategory._id})
            if (!decadeTag) {
                decadeTag = await Tag.create({name: findDecade(releaseYear), category: decadeCategory._id})
            }
            tagsArray.push(decadeTag)
            tagsIds.push(decadeTag._id)


            // find or create yes/no category seed
            let seedCategory = await Category.findOne({name: 'Seed'})
            // if (!seedCategory)
            //     seedCategory = await Category.create({name: "Seed"})

            // find or create seed yes/no tag
            let seedTag = await Tag.findOne({name: '1', category: seedCategory._id})
            if (!seedTag) {
                seedTag = await Tag.create({name: '1', category: seedCategory._id})
            }
            tagsArray.push(seedTag)
            tagsIds.push(seedTag._id)


        // ARTISTS
            // find or create artists
            let artistsArray = []
            let artistsIds = []
            await Promise.all(track.track.artists.map(async (artist) => {
                let dbArtist = await Artist.findOne({spotifyId: artist.id})
                if (!dbArtist) {
                    dbArtist = await Artist.create({
                        spotifyId: artist.id,
                        name: artist.name,
                        spotifyHref: artist.external_urls.spotify,
                        imageUrl: artist.images ? artist.images.url : null,
                        followers: artist.folowers ? artist.folowers.total : null,
                        genres: artist.genres ? artist.genres : null,
                    })
                }

                // artistsArray.push(artist.name)
                artistsIds.push(dbArtist._id)
            }))


        // TRACK
            // create track
            const dbTrack = await Track.create({
                spotifyId: track.track.id,
                name: track.track.name,
                artists: artistsIds,
                album: dbAlbum._id,
                spotifyHref: track.track.href,
                preview: track.track.preview_url,
                uri: track.track.uri,
                popularity: track.track.popularity,
                dateAdded: track.added_at ? track.added_at : null,
                tags: tagsIds
            })
            // allTracks.push(dbTrack)
            newTracks.push(dbTrack)
            // console.log(dbTrack, 'db')
            newTracksIds.push(dbTrack._id)
            newTracksSpotifyIds.push(dbTrack.spotifyId)
        }
    }))

    //populate albums artists
    //request audio features & save in db

    // const newTracks = allTracks.filter(({spotifyId: id1}) =>
    //     !oldTracks.some(({spotifyId: id2}) => id1 === id2))

    // distinct deleted tracks
    // const playlist = await Playlist.findOne({spotifyId: playlistId})
    // const oldTracks = playlist.tracks
    // const deletedTracks = oldTracks.filter(({spotifyId: id1}) =>
    //     !allTracks.some(({spotifyId: id2}) => id1 === id2))
    // console.log(oldTracks, 'old', allTracks, 'all', deletedTracks, 'del')

// populate tracks with audio features
    // request audio features
    // let newTracksIds = newTracks.map((track) => track.spotifyId)

    const spotifyApi = new SpotifyWebApi()
    spotifyApi.setAccessToken(req.user.accessToken)

    let resp = []
    if (newTracksSpotifyIds.length) {
        resp = await spotifyApi.getAudioFeaturesForTracks(newTracksSpotifyIds)

        let allNewPopulatedTracks = [], allNewPopulatedTracksIds = []
        await Promise.all(resp.body.audio_features.map(async (trackInfo, i) => {


            //TAGS THAT BASED ON AUDIO FEATURES
            //     let tagsArray = []
            let tagsIds = []
            // find or create energy category
            let energyCategory = await Category.findOne({name: 'Energy'})
            if (!energyCategory)
                energyCategory = await Category.create({name: "Energy"})

            // find or create energy tag
            let energyTag = await Tag.findOne({
                name: getEnergyPoints(trackInfo.energy), category: energyCategory._id})
            if (!energyTag) {
                energyTag = await Tag.create({
                    name: getEnergyPoints(trackInfo.energy), category: energyCategory._id})
            }
            // tagsArray.push(energyTag)
            tagsIds.push(energyTag._id)


            // // find or create beatType category
            // let beatTypeCategory = await Category.findOne({name: 'Beat type'})
            // if (!beatTypeCategory)
            //     beatTypeCategory = await Category.create({name: "Beat type"})
            //
            // // find or create energy tag
            // let beatTypeTag = await Tag.findOne({name: findDecade(releaseYear), category: beatTypeCategory._id})
            // if (!energyTag) {
            //     beatTypeTag = await Tag.create({name: findDecade(releaseYear), category: beatTypeCategory._id})
            // }
            // tagsArray.push(beatTypeTag)
            // tagsIds.push(beatTypeTag._id)


            //find or create yes/no category vocals
            let vocalsCategory = await Category.findOne({name: 'Vocals'})
            // if (!vocalsCategory)
            //     vocalsCategory = await Category.create({name: "Vocals"})

            // find or create vocal yes/no tag
            let vocalsTag = await Tag.findOne({
                name: getVocals(trackInfo.instrumentalness),
                category: vocalsCategory._id,
                type: 'yes/no',
                suggested: true
            })
            if (!vocalsTag) {
                vocalsTag = await Tag.create({
                    name: getVocals(trackInfo.instrumentalness),
                    category: vocalsCategory._id,
                    type: 'yes/no',
                    suggested: true
                })
            }
            // tagsArray.push(vocalsTag)
            tagsIds.push(vocalsTag._id)

            // console.log(tagsIds)
            const populatedTrack = await Track.findOneAndUpdate({_id: newTracks[i]._id}, {
                $set: {
                    danceability: trackInfo.danceability,
                    duration: {
                        ms: trackInfo.duration_ms,
                        sec: Math.floor(trackInfo.duration_ms / 1000),
                        representation: getRepresentationInSec(trackInfo.duration_ms),

                    },
                    energy: trackInfo.energy,
                    instrumentalness: trackInfo.instrumentalness,
                    key: {
                        number: trackInfo.key,
                        camelot: getCamelot(trackInfo.key, trackInfo.mode),
                        classic: getClasic(trackInfo.key, trackInfo.mode)
                    },
                    mode: trackInfo.mode,
                    bpm: Math.round(trackInfo.tempo),
                    valence: trackInfo.valence,
                },
                $push: {'tags': {$each: tagsIds}}
            }, {populate: [{path: 'artists'}, {path: 'album'}, {path: 'tags'}], new: true})
            //     .populate('artists', Album, Tag).exec((err) => {
            //     console.log(err)
            // })

            // populatedTrack.tags.push(...tagsIds)
            // populatedTrack = await populatedTrack.save()
            // populatedTrack = Track
            // console.log(populatedTrack)
            allNewPopulatedTracks.push(populatedTrack)
            allNewPopulatedTracksIds.push(populatedTrack._id)
        }))

        allTracks = [...allTracks, ...allNewPopulatedTracks]
        allTracksIds = [...allTracksIds, ...allNewPopulatedTracksIds]
    }

    const filter = req.spotifyPlaylistId ? {spotifyId: req.spotifyPlaylistId} : {_id: req.playlistId}
    // console.log(filter, 'fil')
    const playlist = await Playlist.findOneAndUpdate(filter, {$set: {tracks: allTracksIds}})
    // console.log(playlist, 'playlist')
    // logs
    console.log(`🔄 ${playlist.name} synced with DB. All: ${allTracks.length}, Created: ${newTracks.length}`)

    req.allTracks = allTracks
    req.newTracks = newTracks
    // req.deletedTracks = deletedTracks

    next()
})

exports.sendPlaylistContent = catchAsync(async (req, res, next) => {

    // fs.writeFileSync("./hey.json", JSON.stringify(req.allTracks), 'utf8')
    // log
    console.log(`📩 Playlist content sent. All: ${req.allTracks.length} New: ${req.newTracks ? req.newTracks.length : 0}`)

    res.status(201).json({
        status: 'success',
        message: 'New tracks synchronized',
        tracks: {allTracks: req.allTracks, newTracks: req.newTracks}
    })
})