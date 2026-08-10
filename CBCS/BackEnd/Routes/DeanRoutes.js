const express = require('express')
const route = express.Router()
const {DeanSignup,DeanLogin} = require('../Controllers/DeanControllers')
route.post('/signup',DeanSignup)
route.post('/login',DeanLogin)


module.exports = route