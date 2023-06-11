const express = require("express");
const router = express.Router();
const authController = require('./../controllers/authController')


router.get('/request-authorization', authController.requestAuthorization)
router.get('/request-access', authController.requestAccess)
router.get('/me', authController.protect, authController.getMe)

module.exports = router;