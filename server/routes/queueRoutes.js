const express = require("express");
const router = express.Router();
const queueController = require('./../controllers/queueController')
const playlistController = require('./../controllers/playlistController')
const authController = require("../controllers/authController");


// router.get('/', )
// router.post('/')
// router.get('/:queueId')
// router.post('/queueId')
router.post('/any/track', authController.protect, queueController.autoSortQueue)
// router.post('/:queueId/track', )

module.exports = router;

