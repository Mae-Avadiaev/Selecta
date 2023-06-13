const express = require("express");
const authController = require("../controllers/authController");
const tracksController = require("../controllers/trackController");
const playlistController = require("./../controllers/playlistController");
const router = express.Router();

router.post('/', authController.protect)
router.get('/similar',
    authController.protect,
    playlistController.getPlaylist,
    tracksController.findSimilarTracks,
    tracksController.sortTracks,
    tracksController.postTracks)

module.exports = router;