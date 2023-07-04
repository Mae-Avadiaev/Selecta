const express = require("express");
const router = express.Router();
const authController = require('./../controllers/authController')
const presetController = require("../controllers/presetController");
const sharedController = require("../controllers/sharedController");


router.get('/',
    authController.protect,
    presetController.getUserPresets,
    sharedController.sendResponse
)

router.post('/',
    authController.protect,
    presetController.createPreset
)

router.patch('/',
    authController.protect,
    presetController.addPresetToTag,
)

module.exports = router;