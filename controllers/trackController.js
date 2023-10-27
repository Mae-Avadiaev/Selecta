const catchAsync = require("./../utils/catchAsync");
const SpotifyWebApi = require("spotify-web-api-node");
const Playlist = require("../models/playlistModel");
const puppeteer = require("puppeteer");
const timers = require("timers/promises");
const AppError = require("../utils/appError");
const Track = require("../models/trackModel");
const ProxyChain = require('proxy-chain');
const axios = require("axios");
// const devSimilarIds = require('./../similarIds.json')
const {spotifyApi} = require("./authController");
const colorThief = require("colorthief");
const TrackService = require("./../services/trackService")
const {findOrCreateTracks} = require("./playlistController");
const TrackServiceInstance = new TrackService()

async function scrapeSimilarTracks(track) {

    // const server = new ProxyChain.Server({ port: 8000 });
    //
    // server.listen(() => {
    //     console.log(`Proxy server is listening on port ${8000}`);
    // });
    //
    // const oldProxyUrl = 'http://auto:apify_proxy_mwhAz0PHYfPrWb0yLDgagu0Vw4BWvf15tj9w@proxy.apify.com:8000';
    // const newProxyUrl = await ProxyChain.anonymizeProxy(oldProxyUrl);
    //
    // // Prints something like "http://127.0.0.1:45678"
    // console.log(newProxyUrl, "new proxy");


    // const browser = await puppeteer.launch({
    //     headless : false,
    //     devtools : false,
    //     args: ['--no-sandbox']
    //         // `--proxy-server=${newProxyUrl}`
    // });
    //
    // const page = await browser.newPage();
    //
    // // Add Headers
    // await page.setExtraHTTPHeaders({
    //     'user-agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36',
    //     'upgrade-insecure-requests': '1',
    //     'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
    //     'accept-encoding': 'gzip, deflate, br',
    //     'accept-language': 'en-US,en;q=0.9,en;q=0.8'
    // });
    //
    // // Limit requests
    // await page.setRequestInterception(true);
    // page.on('request', async (request) => {
    //     if (request.resourceType() == 'image') {
    //         await request.abort();
    //     } else {
    //         await request.continue();
    //     }
    // });
    //
    //
    // await page.goto('http://api.scraperapi.com?api_key=f2d30751318a653183951a11e7ac4938&url=https://www.nordvpn.com/what-is-my-ip/');
    //
    // function delay(time) {
    //     return new Promise(function(resolve) {
    //         setTimeout(resolve, time)
    //     });
    // }
    //
    //
    // await delay(40000);


    // await page.screenshot({
    //     path: 'screenshot.jpg',
    //     fullPage: true
    // })

// WORKING CODE
    // page.setDefaultNavigationTimeout(0)
    //
    // // console.log(track, 'track')
    // const artistsArray = track.artists.map((artist) => artist.name)
    // // console.log(artistsArray, 'artistArray')
    //
    // const artistsString = artistsArray.join('-').replaceAll(/ /g, '-')
    //     .replaceAll('---', '-')
    //
    // // console.log(artistsArray.join('-'), 'artistsString')
    //
    // const songFullTitle = (track.name.replace(/ /g, '-') + '-' + artistsString)
    //     .replace(/[^a-zA-Z0-9-]/g, '')
    //     .replaceAll('---', '-')
    //     .replaceAll('--', '-')
    // // console.log(track.name, 'track.track.name')
    // // console.log(track.name.replace(/ /g, '-'), "track.name.replace(\' \', \'-\')")
    // // console.log(songFullTitle, 'songFullTitle')
    //
    // // find the track
    // await page.goto('https://tunebat.com/Info/' + songFullTitle + '/' + track.spotifyId, {timeout: 0, waitUntil: 'networkidle2'});
    // await timers.setTimeout(8000)
    // // console.log('https://tunebat.com/Info/' + songFullTitle + '/' + track.spotifyId)
    //
    //
    // // fake it until you make it
    // await page.evaluateOnNewDocument(() => {
    //     Object.defineProperty (navigator, 'platform', { get: () => "Win32" })
    //     Object.defineProperty(navigator, 'productSub', { get: () => "20100101"})
    //     Object.defineProperty (navigator, 'vendor', { get: () => ''})
    //     Object.defineProperty (navigator, 'oscpu', { get: () => 'Windows NT 10.0; Win64; x64' })
    // })
    //
    // await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:73.0) Gecko/20100101 Firefox/73.0')
    //
    //
    // const similarTracks = await page.evaluate( () => {
    //
    //     let similarTracks = []
    //
    //     document.querySelectorAll('a[tabindex = "0"]').forEach((a, i) => {
    //         let link = a.href
    //         if (link.match("spotify")) {
    //
    //             const bpm = a.parentElement.previousSibling.firstChild.firstChild.childNodes[1].firstChild.childNodes[2].firstChild.textContent
    //
    //             similarTracks.push(link.substring(31))
    //                 // link: link,
    //                 // id: link.substring(31),
    //                 // uri: 'spotify:track:' + link.substring(31),
    //                 // bpm: bpm
    //
    //         }
    //     })
    //     return (similarTracks)
    // })

    // await browser.close();

    // await proxyChain.closeAnonymizedProxy(newProxyUrl, true);

    const artistsArray = track.artists.map((artist) => artist.name)

    const artistsString = artistsArray.join('-').replaceAll(/ /g, '-')
        .replaceAll('---', '-')

    const songFullTitle = (track.name.replace(/ /g, '-') + '-' + artistsString)
        .replace(/[^a-zA-Z0-9-]/g, '')
        .replaceAll('---', '-')
        .replaceAll('--', '-')


    let similarIds
    // if (process.env.mode === 'DEVELOPMENT') {
    //
    //     //log
    //     console.log('🧽 Loaded test file...')
    //
    //     similarIds = devSimilarIds
    //
    // } else {

        //log
        console.log('🧽 Scraping...')

        const url = 'https://tunebat.com/Info/' + songFullTitle + '/' + track.spotifyId
        const apikey = 'f48167a7ab9423671e9b15e8cffb7a921011ae34';
        const links = await axios({
            url: 'https://api.zenrows.com/v1/',
            method: 'GET',
            params: {
                'url': url,
                'apikey': apikey,
                'antibot': 'true',
                'css_extractor': `{"links":"a[tabindex = '0'] @href"}`,
            },
        }).catch(error => console.log(error));

        similarIds = links.data.links.slice(1).map(link => link.substring(31))
    // }
    console.log(similarIds)

    return (similarIds)
}

exports.scrapRymForTrackInfo = catchAsync(async (req, res, next) => {

    let tracks
    if (req.allTracks && req.allTracks.length) {
        tracks = req.allTracks
    }

    // if (process.env.mode === 'DEVELOPMENT') {
    //
    //     //log
    //     console.log('🧽 Loaded test file...')
    //
    //     similarIds = devSimilarIds
    //
    // } else {

        //log
        console.log('🧽 Scraping...')

        const url = 'https://tunebat.com/Info/' + songFullTitle + '/' + track.spotifyId
        const apikey = 'f48167a7ab9423671e9b15e8cffb7a921011ae34';
        const links = await axios({
            url: 'https://api.zenrows.com/v1/',
            method: 'GET',
            params: {
                'url': url,
                'apikey': apikey,
                'antibot': 'true',
                'css_extractor': `{"links":"a[tabindex = '0'] @href"}`,
            },
        }).catch(error => console.log(error));

        similarIds = links.data.links.slice(1).map(link => link.substring(31))
    // }

})

exports.getTracksInfo = catchAsync(async (req, res, next) => {

    const spotifyApi = new SpotifyWebApi()
    spotifyApi.setAccessToken(req.user.accessToken)

    const response = await spotifyApi.getTracks(req.query.tracks)

    // log
    console.log(`▶️ Retrieved info for ${req.query.tracks.length} track(s)`)

    req.code = 200
    req.status = 'success'
    req.message = `${req.query.tracks.length} tracks' info requested`
    req.spotifyData = response.body.tracks

    req.allTracks = response.body.tracks

    next()
})

exports.getTracksAudioFeatures = catchAsync(async (req, res, next) => {

    const spotifyApi = new SpotifyWebApi()
    spotifyApi.setAccessToken(req.user.accessToken)

    let tracksIds
    if (req.query.tracks) tracksIds = req.query.tracks
    else if (req.allTracks && req.allTracks.length && req.allTracks[0].item) {
        tracksIds = req.allTracks.map((track => track.item.id))
    } else {
        // log
        console.log(`⏭  Skipped get tracks audio features: no tracks provided`)
        next()
        return
    }



    const response = await spotifyApi.getAudioFeaturesForTracks(tracksIds)
    // console.log(response.body.audio_features)

    // log
    console.log(`▶️ Retrieved audio features for ${tracksIds.length} track(s)`)

    req.code = 200
    req.status = 'success'
    req.message = `${tracksIds.length} tracks' audio features requested`


    if (req.query.tracks)
        req.allTracks = response.body.audio_features
    else if (req.allTracks && req.allTracks.length)
        req.allTracks = req.allTracks.map(track => Object.assign(track, response.body))

    // console.log(req.allTracks, 'allTracks')

    next()
})


exports.getRecommendations = catchAsync(async (req, res, next) => {

    console.log(req.query)

    let tracks = []
    if (req.query.neighbourKeys) {
        const neighbourKeys = req.query.neighbourKeys
        delete req.query.neighbourKeys
        await Promise.all(neighbourKeys.map(async (pair) => {
            const params = req.query
            // params.target_key = pair.target_key
            // params.target_mode = pair.target_mode
            params.min_key = pair.target_key
            params.max_key = pair.target_key
            params.min_mode = pair.target_mode
            params.max_mode = pair.target_mode
            // req.query.limit = Math.round(req.query.limit / 4)
            console.log(params)
            let response = await TrackServiceInstance.getRecommendations(
                params, req.user.accessToken)
            tracks = [...tracks, ...response]
        }))
        // filter not unique
        tracks = [...new Map(tracks.map(v => [v.id, v])).values()]
    } else {
        tracks = await TrackServiceInstance.getRecommendations(
            req.query, req.user.accessToken)
    }
    // console.log(tracks.length, 'leeeeeeeeeeeo')
    // console.log(tracks)

    let recommendations = []
    if (tracks.length) {
        const tracksWithFeatures = await TrackServiceInstance.fillTracksWithInfo(
            tracks, req.user.accessToken)
        // console.log(tracksWithFeatures, 'featureeeet')

        recommendations = await TrackServiceInstance.findOrCreateTracks(tracksWithFeatures)
    }

    // find relevance
    console.log(req.query, 'faga')
    await TrackServiceInstance.fillTracksWithRelevance(recommendations, req.query.seed)

    const message = `Received ${recommendations.length} recommended tracks`

    console.log(`📤 Response with message "${message}" sent to the client.`)
    console.log('- - - - - - - © Selecta - - - - - - -')

    res.status(200).json({
        status: 'success',
        message: message,
        recommendations: recommendations
    })
})

exports.findSimilarTracks = catchAsync(async (req, res, next) => {

    // console.log(req.query)
    if (!req.query.newTracksIds) {
        console.log(`⏭  Skipped find similar tracks: no new tracks`)
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

        // console.log(similarIds)
        if (!similarIds) return next(new AppError('Scraper error. No similar tracks scraped', 421));


        // request full info
        const resp = await spotifyApi.getTracks(similarIds)
        const similarTracks = resp.body.tracks
        // console.log(similarTracks)

        allSimilarTracks = [...allSimilarTracks, ...similarTracks]
    }))

    // log
    console.log(`🧽 Scraped ${allSimilarTracks.length} similar tracks` )

    // console.log(allSimilarTracks[0])

    req.similarTracks = allSimilarTracks
    req.allTracks = allSimilarTracks
    req.syncWithPlaylistId = req.user.similar
    req.spotifyData = allSimilarTracks
    // req.sortTo = await Playlist.find({spotifyId:{$in: req.user.queues}})

    next()
})

exports.addToPlaylistDB = catchAsync(async (req, res, next) => {

    await Promise.all(req.playlistsContent.map(async (group) => {
        await Playlist.updateOne({_id: group.playlist._id}, {$push: {tracks: {$each: group.content}}})
    }))

    //log
    console.log(`➡️ Added track(s) to ${req.playlistsContent.length} playlist(s) to DB`)

    next()
})

exports.removeFromPlaylistDB = catchAsync(async (req, res, next) => {

    //request all
    let playlistId
    if (req.query.type === 'similar')
        playlistId = req.user.similar

    const playlist = await Playlist.findOne({_id: playlistId})
    const allSimilarTracks = playlist.tracks
    const filteredSimilarTracks = playlist.tracks.filter(
        n => !req.query.toDeleteTracksIds.includes(n.toString()))
    await Playlist.updateOne({_id: playlistId}, {tracks: filteredSimilarTracks})

    //log
    console.log(`⬅️ Removed ${allSimilarTracks.length - filteredSimilarTracks.length} tracks from ${playlist.name} (DB)`)

    req.code = 200
    req.status = 'success'
    req.message = 'Tracks deleted form db'
    next ()
})

exports.sortTracks = catchAsync(async (req, res, next) => {

    let sortTo
    if (req.query.type === 'queues')
        sortTo = await Playlist.find({_id: {$in: req.user.queues}})

    const tracksToSort = await Track.find({_id: {$in : req.query.tracksIdsToSort}})
    // console.log(req.query.tracksIdsToSort)
    // console.log(tracksToSort, 'to sort tracks')

    let allPlaylistsContent = []
    let playlistContentCount = 0
    await Promise.all(sortTo.map(async (playlist, i) => {

        const playlistContent = []

        // sort tracks
        await Promise.all(tracksToSort.map(async (track) => {

            if (track.bpm >= 160)
                track.bpm = track.bpm / 2

            if (playlist.rules.bpmRange) {
                if (track.bpm >= playlist.rules.bpmRange.from && track.bpm < playlist.rules.bpmRange.to) {
                    playlistContent.push(track)
                    playlistContentCount++
                }
            }

        }))

        if (playlistContent.length)
            allPlaylistsContent.push({playlist: playlist, content: playlistContent})

    }))

    // console.log(allPlaylistsContent, 'all pc')

    // log
    console.log(`🗃 Sorted ${playlistContentCount} track(s) to ${allPlaylistsContent.length} playlist(s)`)

    req.playlistsContent = allPlaylistsContent
    next()
})


exports.addToPlaylistSpotify = catchAsync(async (req, res, next) => {

    const spotifyApi = new SpotifyWebApi()
    spotifyApi.setAccessToken(req.user.accessToken)

    //push to Spotify
    await Promise.all(req.playlistsContent.map((pContent) => {

        const tracksUris = pContent.content.map(track => track.uri)

        //push to Spotify
        spotifyApi.addTracksToPlaylist(pContent.playlist.spotifyId, tracksUris)

    }))

    // log
    console.log(`🎵 Added track(s) to ${req.playlistsContent.length} Spotify playlist(s)`)

    req.code = 201
    req.status = 'success'
    req.message = 'Tracks added to Queues'
    next()
})

exports.requestTracksInfo = catchAsync(async (req, res, next) => {

    const spotifyApi = new SpotifyWebApi()
    spotifyApi.setAccessToken(req.user.accessToken)

    const response = await spotifyApi.getTracks(req.query.tracksSpotifyIds)

    // console.log(response.body)

    // log
    console.log(`▶️ Retrieved ${response.body.tracks.length} track(s) info from Spotify`)

    req.spotifyData = response.body.tracks

    next()
})

exports.getPlayingTrack = catchAsync(async (req, res, next) => {

    const playingTrackData = await TrackServiceInstance.getPlayingTrackData(req.user.accessToken)

    if (playingTrackData) {
        await TrackServiceInstance.fillTracksWithInfo([playingTrackData], req.user.accessToken)
    }

    let playingTrack = playingTrackData ?
        await TrackServiceInstance.findOrCreateTracks([playingTrackData]) : null

    playingTrack = playingTrack ? playingTrack[0] : null

    const message = playingTrack ? `Received currently playing track` : `Track on pause`

    console.log(`📤 Response with message "${message}" sent to the client.`)
    console.log('- - - - - - - © Selecta - - - - - - -')

    res.status(200).json({
        status: 'success',
        message: message,
        playingTrack: playingTrack
    })
})

exports.sendMessage = catchAsync(async (req, res, next) => {

    //log
    console.log(`📤 Message "${req.message}" sent to client. Tracks in the body: All: ${req.allTracks ? req.allTracks.length : '0'}, New: ${req.newTracks ? req.newTracks.length : '0'}`)
    console.log('- - - - - - - © Selecta - - - - - - -')

    res.status(req.code).json({
        status: req.status,
        message: req.message,
        tracks: {allTracks: req.allTracks, newTracks: req.newTracks}
    })
})

exports.search = catchAsync(async (req, res, next) => {

    console.log(req.user, 'rere')
    const spotifyApi = new SpotifyWebApi()
    spotifyApi.setAccessToken(req.user.accessToken)

    const response = await spotifyApi.searchTracks(req.query.query)
    const tracks = response.body.tracks.items

    const message = `Found ${tracks.length} tracks`
    // const message = `Found ${1234} tracks`
    console.log(`📤 Message "${message}" sent to client.`)
    console.log('- - - - - - - © Selecta - - - - - - -')

    res.status(200).json({
        status: 'success',
        message: message,
        tracks: tracks
    })
})

exports.postTrack = catchAsync(async (req, res, next) => {

    const tracksWithInfo = await TrackServiceInstance.fillTracksWithInfo(
        req.body.tracksData, req.user.accessToken)

    const tracks = await TrackServiceInstance.findOrCreateTracks(tracksWithInfo)

    const message = `Found or created ${tracks.length} tracks`
    console.log(`📤 Message "${message}" sent to client.`)
    console.log('- - - - - - - © Selecta - - - - - - -')

    res.status(200).json({
        status: 'success',
        message: message,
        tracks: tracks
    })
})