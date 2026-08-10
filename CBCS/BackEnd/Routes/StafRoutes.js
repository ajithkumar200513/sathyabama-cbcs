const express = require('express')
const route = express.Router()
const {StafSignup,StafLogin} = require('../Controllers/StafController')
route.post('/signup',StafSignup)
route.post('/login',StafLogin)


module.exports = route