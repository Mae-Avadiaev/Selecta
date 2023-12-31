const express = require("express");
const authController = require("../controllers/authController");
const tracksController = require("../controllers/trackController");
const playlistController = require("./../controllers/playlistController");
const router = express.Router();


// router.get('/',
//     authController.protect,
//     tracksController.getTracksInfo,
//     playlistController.findOrCreateTracks,
//     tracksController.sendMessage
// )

router.post('/',
    authController.protect,
    tracksController.postTrack
)

router.get('/search/',
    authController.protect,
    tracksController.search,

)

router.get('/recommendations',
    authController.protect,
    tracksController.getRecommendations
)

router.get('/playing',
    authController.protect,
    tracksController.getPlayingTrack

)

// router.delete('/similar',
//     authController.protect,
//     tracksController.removeFromPlaylistDB,
//     tracksController.sendMessage
// )

// router.post('/queues',
//     authController.protect,
//     tracksController.sortTracks,
//     tracksController.addToPlaylistDB,
//     tracksController.addToPlaylistSpotify,
//     tracksController.sendMessage
// )

// router.get('/:id/info',
//     authController.protect,
//     tracksController.getPlayingTrack,
//     tracksController.getTracksAudioFeatures,
//     // tracksController.scrapRymForTrackInfo,
//     tracksController.sendMessage
// )

module.exports = router;