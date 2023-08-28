const express = require("express");
const router = express.Router();
const authController = require('./../controllers/authController')
const userController = require("../controllers/userController");
const sharedController = require("../controllers/sharedController");
const playlistController = require("./../controllers/playlistController");

router.get('/', authController.protect, userController.getMe)

router.get('/seeds',
    authController.protect,
    userController.getSeeds,
    sharedController.sendResponse
)

router.get('/likes',
    authController.protect,
    userController.getLikes,
    sharedController.sendResponse
)

router.patch('/likes',
    authController.protect,
    userController.patchLikes
)

router.get('/spotify-playlists',
    authController.protect,
    userController.getSpotifyUserPlaylists,
    sharedController.sendResponse
)

router.get('/spotify-likes',
    authController.protect,
    userController.getSpotifyUserLikes,
    sharedController.sendResponse
)

module.exports = router;