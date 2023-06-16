const catchAsync = require("./../utils/catchAsync");
const SpotifyWebApi = require("spotify-web-api-node");
const Playlist = require("../models/playlistModel");
const puppeteer = require("puppeteer");
const timers = require("timers/promises");
const AppError = require("../utils/appError");
const Track = require("../models/trackModel");

async function scrapeSimilarTracks(track) {
    // console.log('hey1')

    const browser = await puppeteer.launch({
        headless : false,
        devtools : false,
        args: ['--no-sandbox']
    });

    const page = await browser.newPage();

    page.setDefaultNavigationTimeout(0)

    // console.log(track, 'track')
    const artistsArray = track.artists.map((artist) => artist.name)
    // console.log(artistsArray, 'artistArray')

    const artistsString = artistsArray.join('-').replaceAll(/ /g, '-')
        .replaceAll('---', '-')

    console.log(artistsArray.join('-'), 'artistsString')

    const songFullTitle = (track.name.replace(/ /g, '-') + '-' + artistsString)
        .replace(/[^a-zA-Z0-9-]/g, '').replaceAll('---', '-')
    console.log(track.name, 'track.track.name')
    console.log(track.name.replace(/ /g, '-'), "track.name.replace(\' \', \'-\')")
    console.log(songFullTitle, 'songFullTitle')

    // find the track
    await page.goto('https://tunebat.com/Info/' + songFullTitle + '/' + track.spotifyId, {timeout: 0, waitUntil: 'networkidle2'});
    await timers.setTimeout(8000)
    console.log('https://tunebat.com/Info/' + songFullTitle + '/' + track.spotifyId)

    const similarTracks = await page.evaluate( () => {

        let similarTracks = []

        document.querySelectorAll('a[tabindex = "0"]').forEach((a, i) => {
            let link = a.href
            if (link.match("spotify")) {

                const bpm = a.parentElement.previousSibling.firstChild.firstChild.childNodes[1].firstChild.childNodes[2].firstChild.textContent

                similarTracks.push(link.substring(31))
                    // link: link,
                    // id: link.substring(31),
                    // uri: 'spotify:track:' + link.substring(31),
                    // bpm: bpm

            }
        })
        return (similarTracks)
    })

    await browser.close();

    return (similarTracks)
}

exports.findSimilarTracks = catchAsync(async (req, res, next) => {

    // console.log(req.query)
    if (!req.query.newTracksIds) {
        console.log(`⏭ Skipped find similar tracks: tracks are not provided`)
        next()
        return
    }
        // return next(new AppError('No tracks provided to find similar ones', 404));

    // console.log(req.query.newTracksIds)

    // request new tracks from DB and populate
    const newTracks = await Track.find({_id: {'$in': req.query.newTracksIds}})
        .populate('artists')

    // console.log(newTracks[0])

    const spotifyApi = new SpotifyWebApi()
    spotifyApi.setAccessToken(req.user.accessToken)

    // find similar tracks
    let allSimilarTracks = []

    await Promise.all(newTracks.map(async (track) => {
        const similarIds = await scrapeSimilarTracks(track)

        console.log(similarIds)
        if (!similarIds) return next(new AppError('Scraper error. No similar tracks scraped', 421));


        // request full info
        const resp = await spotifyApi.getTracks(similarIds)
        const similarTracks = resp.body.tracks
        // console.log(similarTracks)

        allSimilarTracks = [...allSimilarTracks, ...similarTracks]
    }))

    // log
    console.log(`🔍 Found ${allSimilarTracks.length} similar tracks` )

    // console.log(allSimilarTracks[0])

    req.similarTracks = allSimilarTracks
    req.allTracks = allSimilarTracks
    req.playlistId = req.user.similar
    req.spotifyData = allSimilarTracks
    // req.sortTo = await Playlist.find({spotifyId:{$in: req.user.queues}})

    next()
})

exports.sortTracks = catchAsync(async (req, res, next) => {

    let allPlaylistsContent = []
    await Promise.all(req.sortTo.map(async (playlist, i) => {

        const playlistContent = []

        // sort tracks
        await Promise.all(req.tracksToSort.map(async (track) => {

            if (track.bpm >= 160)
                track.bpm = track.bpm / 2

            if (playlist.rules.bpmRange)
                if (track.bpm >= playlist.rules.bpmRange.from && track.bpm < playlist.rules.bpmRange.to)
                    playlistContent.push(track)
        }))

        allPlaylistsContent.push({
            playlist: playlist,
            content: playlistContent
        })
    }))

    // log
    console.log(`🗃 Sorted to ${allPlaylistsContent.length} playlists`)

    req.playlistsContent = allPlaylistsContent
    next()
})


exports.postTracks = catchAsync(async (req, res, next) => {

    const spotifyApi = new SpotifyWebApi()
    spotifyApi.setAccessToken(req.user.accessToken)

    //push to Spotify
    await Promise.all(req.playlistsContent.map((pContent) => {

        //push to Spotify
        spotifyApi.addTracksToPlaylist(pContent.playlist.spotifyId, pContent.content.uri)


    }))

    // push to DB


    // if (req.qsContent) {
    //     req.qsContent.map(async (qContent, i) => {
    //         if (qContent.length > 0)
    //             await spotifyApi.addTracksToPlaylist(req.user.queues[i], qContent)
    //     })
    // }
})