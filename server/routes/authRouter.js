const express = require("express");
const router = express.Router();
const authController = require('./../controllers/authController')


router.get('/request-authorization', authController.requestAuthorization)
router.get('/request-access', authController.requestAccess)
router.get('/log-out', authController.logOut)

module.exports = router;