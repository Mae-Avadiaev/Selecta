const express = require("express");
const router = express.Router();
const authController = require('./../controllers/authController')
const playlistController = require('./../controllers/playlistController')
const trackController = require('./../controllers/trackController')

router.post('/', authController.protect, playlistController.createPlaylist)

router.get('/',
    authController.protect,
    playlistController.getSpotifyPlaylist,
    playlistController.findOrCreateTracks,
    playlistController.syncWithDB,
    playlistController.sendPlaylistContent
)

router.get('/similar',
    authController.protect,
    trackController.findSimilarTracks,
    playlistController.findOrCreateTracks,
    playlistController.syncWithDB,
    playlistController.sendPlaylistContent
)

module.exports = router;