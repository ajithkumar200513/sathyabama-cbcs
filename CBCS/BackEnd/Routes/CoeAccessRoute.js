const express = require('express')
const route = express.Router()
const {getCoeStudentInfo} = require('../Controllers/CourseController')
const CoeRequireAuth = require('../middleware/CoeRequireAuth')
route.use(CoeRequireAuth)
route.post('/getstudinfo',getCoeStudentInfo)
module.exports = route
