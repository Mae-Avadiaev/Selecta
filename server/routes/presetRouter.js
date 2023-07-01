const express = require("express");
const router = express.Router();
const authController = require('./../controllers/authController')
const presetController = require("../controllers/presetController");


router.get('/',
    authController.protect,
    presetController.getPinnedOrRecentPresets,

)

module.exports = router;