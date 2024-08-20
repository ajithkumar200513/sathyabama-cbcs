const express = require('express')
const route = express.Router()
const {getCoeStudentInfo} = require('../Controllers/CourseController')
const DeanRequireAuth = require('../middleware/DeanRequireAuth')
route.use(DeanRequireAuth)
route.post('/getstudinfo',getCoeStudentInfo)
module.exports = route
