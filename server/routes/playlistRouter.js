const express = require("express");
const router = express.Router();
const authController = require('./../controllers/authController')
const playlistController = require('./../controllers/playlistController')

router.post('/', authController.protect, playlistController.createPlaylist)
router.get('/', authController.protect, playlistController.getPlaylist, playlistController.sendPlaylist)
module.exports = router;