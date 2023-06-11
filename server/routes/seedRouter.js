const express = require("express");
const router = express.Router();
const seedsController = require('./../controllers/seedsController')

router.get('/', seedsController.getSeeds)

module.exports = router;