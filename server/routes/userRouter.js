const express = require("express");
const router = express.Router();
const authController = require('./../controllers/authController')
const userController = require("../controllers/userController");
const sharedController = require("../controllers/sharedController");

router.get('/', authController.protect, userController.getMe)
router.get('/seeds',
    authController.protect,
    userController.getSeeds,
    sharedController.sendResponse)

module.exports = router;