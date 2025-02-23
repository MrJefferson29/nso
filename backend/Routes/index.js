const express = require('express')
const router = express.Router();

const authRoute = require("./auth")
const shoproute = require('./shop')
const featuresRoute = require('./features')
const userRoute = require('./user')
const aiRoute = require('./ai');


router.use('/auth', authRoute)
router.use('/ai', aiRoute)
router.use('/shop', shoproute)
router.use('/features', featuresRoute)
router.use('/user', userRoute)

module.exports = router;
