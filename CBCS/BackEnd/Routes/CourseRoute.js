const express = require('express')
const route = express.Router()
const Student = require('../middleware/StudentRequireAuth')
const {getCourse,createCourse,updatecourse,updateUserCourse,getUserCourse} = require('../Controllers/CourseController')
route.use(Student)
route.get('/',getCourse)
route.get('/:id',getUserCourse)
route.post('/create',createCourse)
route.put('/update/:id',updatecourse)
route.put('/update/user/:id',updateUserCourse)
module.exports = route