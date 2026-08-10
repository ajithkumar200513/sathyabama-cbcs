const express = require('express')
const route = express.Router()
const {HodSignup,HodLogin} = require('../Controllers/HodControllers')
route.post('/signup',HodSignup)
route.post('/login',HodLogin)


module.exports = route