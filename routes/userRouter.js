const express = require("express");
const router = express.Router();
const authController = require('./../controllers/authController')
const userController = require("../controllers/userController");
const sharedController = require("../controllers/sharedController");
const playlistController = require("./../controllers/playlistController");
const presetController = require("../controllers/presetController");

router.get('/', authController.protect, userController.getMe)

router.get('/seeds',
    authController.protect,
    userController.getSeeds,
    sharedController.sendResponse
)

router.get('/likes/',
    authController.protect,
    userController.getLikes
)

router.get('/likes-sources',
    authController.protect,
    userController.getLikesSources
)

router.patch('/likes-sources',
    authController.protect,
    userController.addLikesSource
)

router.delete('/likes-sources',
    authController.protect,
    userController.deleteLikesSource
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

router.get('/presets/',
    authController.protect,
    userController.getUserPresets,
)

router.patch('/presets/',
    authController.protect,
    presetController.createPreset
)

module.exports = router;