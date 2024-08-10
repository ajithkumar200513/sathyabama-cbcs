const express = require('express')
const route = express.Router()
const {userSignup,userLogin} = require('../Controllers/userControllers')
route.post('/signup',userSignup)
route.post('/login',userLogin)

module.exports = route