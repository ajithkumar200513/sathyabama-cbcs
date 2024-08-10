const express = require('express')
const route = express.Router()
const {CoeSignup,CoeLogin} = require('../Controllers/CoeControllers')
route.post('/signup',CoeSignup)
route.post('/login',CoeLogin)


module.exports = route