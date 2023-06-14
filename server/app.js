const express = require('express')
// const {scrapeSimilarTracks, requestFullInfo} = require("./utils/scrapers");
const queryString = require("node:querystring");
const axios = require("axios");
const dotenv = require("dotenv");
const {response} = require("express");
const cors = require("cors");
const SpotifyWebApi = require("spotify-web-api-node");
const AppError = require("./utils/appError");
const app = express()
const port = process.env.PORT || 3000
const authRouter = require("./routes/authRouter")
const playlistRouter = require("./routes/playlistRouter")
const cookies = require("cookie-parser")

const authController = require('./controllers/authController')
const playlistController = require("./controllers/playlistController");
const refreshController = require("./controllers/refreshController")
const tracksRouter = require("./routes/tracksRouter")
const {errorHandler} = require("./controllers/errorController");

dotenv.config({path: './.env'})

const corsOptions = {
    // origin: '*',
    origin: ['http://localhost:3001', 'http://localho.st:3001'],
    optionsSuccessStatus: 200,
    credentials : true
}
app.use(cors(corsOptions));
app.use(express.json())
app.use(cookies());

// app.get('/similar-tracks', async (req, res) => {
//
//     if (accessToken) {
//
//         // console.log(req.query.link)
//         // const testUrl = 'https://tunebat.com/Info/Kill-Bill-SZA/3OHfY25tqY28d16oZczHc8'
//         // let similarTracks = await scrapeSimilarTracks(req.query.link)
//
//         // console.log(similarTracks)
//         let test = [
//             {
//                 link: 'https://open.spotify.com/track/7o44vqiznJAsLZpSZwtCkV',
//                 id: '7o44vqiznJAsLZpSZwtCkV'
//             },
//             {
//                 link: 'https://open.spotify.com/track/0Kz9aGVgFvndWkcaiylIt5',
//                 id: '0Kz9aGVgFvndWkcaiylIt5'
//             },
//             {
//                 link: 'https://open.spotify.com/track/10wts7gW6XFI4k1BrDKsAc',
//                 id: '10wts7gW6XFI4k1BrDKsAc'
//             },
//             {
//                 link: 'https://open.spotify.com/track/0oufSLnKQDoBFX5mgkDCgR',
//                 id: '0oufSLnKQDoBFX5mgkDCgR'
//             },
//             {
//                 link: 'https://open.spotify.com/track/4k6Uh1HXdhtusDW5y8Gbvy',
//                 id: '4k6Uh1HXdhtusDW5y8Gbvy'
//             },
//         ]
//
//         const tracksFullInfo = await requestFullInfo(accessToken, similarTracks)
//
//         // console.log('hey')
//         // console.log(tracksFullInfo.length)
//         const fs = require('fs');
//         // console.log(tracksFullInfo)
//
//         const json = JSON.stringify(tracksFullInfo)
//         fs.writeFile('myjsonfile.json', json, 'utf8', err => {
//             if (err) {
//                 console.error(err);
//             }
//             console.log('written')
//         });
//         res.send(tracksFullInfo)
//
//     } else {
//         res.redirect('http://localhost:3000/auth')
//     }
// })

// app.get("/queue", async (req, res) => {})
app.post("/queue/:queueId/track", async (req, res) => {

    //sort to which queue



    const response = await axios.get('https://api.spotify.com/v1/playlists/' + req.params.playlistId + '/tracks' + req.query.uris, {
        headers: {
            Authorization: "Bearer " + accessToken,
            "Content-Type": "application/json"
        }
    })

    res.send('success')
    // .catch((err) => {
    //     console.log(err)
    //     console.log(err.message)
    //     res.send('error')
    // })
})

//ROUTES
app.use('/auth', authRouter)
app.use('/v1/playlist', playlistRouter)
app.use('/v1/tracks', tracksRouter)

//ERROR HANDLER
app.use(errorHandler)

app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.listen(port, () => {
    console.log(`Selecta server is listening on port ${port}...`)
})