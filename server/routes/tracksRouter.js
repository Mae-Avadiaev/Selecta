const express = require("express");
const authController = require("../controllers/authController");
const tracksController = require("../controllers/trackController");
const playlistController = require("./../controllers/playlistController");
const router = express.Router();

// router.post('/', authController.protect)
// router.get('/similar',
//     authController.protect,
//     playlistController.getPlaylist,
//     tracksController.findSimilarTracks,
//     tracksController.sortTracks,
//     tracksController.postTracks)

router.get('/',
    authController.protect,
    tracksController.getTracksInfo,
    tracksController.sendMessage
)

router.get('/audio-features',
    authController.protect,
    tracksController.getTracksAudioFeatures,
    tracksController.sendMessage
)

router.delete('/similar',
    authController.protect,
    tracksController.removeFromPlaylistDB,
    tracksController.sendMessage
)

router.post('/queues',
    authController.protect,
    tracksController.sortTracks,
    tracksController.addToPlaylistDB,
    tracksController.addToPlaylistSpotify,
    tracksController.sendMessage
)

module.exports = router;