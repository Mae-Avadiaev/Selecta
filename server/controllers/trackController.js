const catchAsync = require("./../utils/catchAsync");
const SpotifyWebApi = require("spotify-web-api-node");
const {scrapeSimilarTracks} = require("../utils/scrapers");
const Playlist = require("../models/playlistModel");

exports.findAndSortSimilarTracks = catchAsync(async (req, res, next) => {

    // find similar tracks
    let allSimilarTracks = []
    for (let i = 0; i < req.newTracks.length; i++) {
        const similarTracks = await scrapeSimilarTracks(req.newTracks[i])
        // console.log(similarTracks, 'simRef')
        allSimilarTracks = [...allSimilarTracks, ...similarTracks]
    }
    //
    // req.user.queues.map(async (qSpotifyId) => {
    //
    //     // retrieve q from db to see its rules
    //     const q = await Playlist.findOne({spotifyId: qSpotifyId})
    //     q.rules.map()
    //
    // })

    // sort tracks
    let qsContent = []
    for (let i = 0; i < 16; i++) {
        qsContent.push([])
    }
    for (let i = 0; i < allSimilarTracks.length; i++) {
        // if (allSimilarTracks[i].bpm > 195 )
        if (allSimilarTracks[i].bpm >= 160)
            allSimilarTracks[i].bpm = allSimilarTracks[i].bpm / 2

        if (allSimilarTracks[i].bpm >= 135 && allSimilarTracks[i].bpm < 160) {
            qsContent[15].push(allSimilarTracks[i].uri)
        } else if (allSimilarTracks[i].bpm >= 130 && allSimilarTracks[i].bpm < 135) {
            qsContent[14].push(allSimilarTracks[i].uri)
        } else if (allSimilarTracks[i].bpm >= 125 && allSimilarTracks[i].bpm < 130) {
            qsContent[13].push(allSimilarTracks[i].uri)
        } else if (allSimilarTracks[i].bpm >= 120 && allSimilarTracks[i].bpm < 125) {
            qsContent[12].push(allSimilarTracks[i].uri)
        } else if (allSimilarTracks[i].bpm >= 115 && allSimilarTracks[i].bpm < 120) {
            qsContent[11].push(allSimilarTracks[i].uri)
        } else if (allSimilarTracks[i].bpm >= 110 && allSimilarTracks[i].bpm < 115) {
            qsContent[10].push(allSimilarTracks[i].uri)
        } else if (allSimilarTracks[i].bpm >= 105 && allSimilarTracks[i].bpm < 110) {
            qsContent[9].push(allSimilarTracks[i].uri)
            // } else if (allSimilarTracks[i].bpm >= 75 && allSimilarTracks[i].bpm <= 105) {

        } else if (allSimilarTracks[i].bpm >= 100 && allSimilarTracks[i].bpm < 105) {
            qsContent[7].push(allSimilarTracks[i].uri)
        } else if (allSimilarTracks[i].bpm >= 95 && allSimilarTracks[i].bpm < 100) {
            qsContent[6].push(allSimilarTracks[i].uri)
        } else if (allSimilarTracks[i].bpm >= 90 && allSimilarTracks[i].bpm < 95) {
            qsContent[5].push(allSimilarTracks[i].uri)
        } else if (allSimilarTracks[i].bpm >= 80 && allSimilarTracks[i].bpm < 90) {
            qsContent[4].push(allSimilarTracks[i].uri)
            // } else if (allSimilarTracks[i].bpm >= && allSimilarTracks[i].bpm < ) {

        } else if (allSimilarTracks[i].bpm >= 70 && allSimilarTracks[i].bpm < 80) {
            qsContent[2].push(allSimilarTracks[i].uri)
        } else if (allSimilarTracks[i].bpm >= 60 && allSimilarTracks[i].bpm < 70) {
            qsContent[1].push(allSimilarTracks[i].uri)
        } else if (allSimilarTracks[i].bpm >= 45 && allSimilarTracks[i].bpm < 60) {
            qsContent[0].push(allSimilarTracks[i].uri)
        }
    }

    req.qsContent = qsContent
    next()
})


exports.postTracks = catchAsync(async (req, res, next) => {

    const spotifyApi = new SpotifyWebApi()
    spotifyApi.setAccessToken(req.user.accessToken)

    console.log(req.qsContent)

    if (req.qsContent) {
        req.qsContent.map(async (qContent, i) => {
            if (qContent.length > 0)
                await spotifyApi.addTracksToPlaylist(req.user.queues[i], qContent)
        })
    }
})