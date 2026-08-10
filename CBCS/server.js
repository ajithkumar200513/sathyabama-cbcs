const express = require('express')
const cors = require('cors')
const app = express()
const mongoose = require('mongoose')
const userRoute = require('./BackEnd/Routes/User')
const courseRoute = require('./BackEnd/Routes/CourseRoute')
const HodRoute = require('./BackEnd/Routes/HodRoute')
const HodCourseRoute = require('./BackEnd/Routes/HodCourseRoute')
const StafRoute = require('./BackEnd/Routes/StafRoutes')
const StaffCourseRoute = require('./BackEnd/Routes/StaffCourseRoute')
const CoeRoutes = require('./BackEnd/Routes/CoeRoutes')
const CoeAccessRoutes =  require('./BackEnd/Routes/CoeAccessRoute')
const DeanRoutes = require('./BackEnd/Routes/DeanRoutes') 
const DeanAccessRoute = require('./BackEnd/Routes/DeanAccessRoute')
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(cors())
app.use('/cbcs/user',userRoute)
app.use('/cbcs/course',courseRoute)
app.use('/cbcs/hod',HodRoute)
app.use('/cbcs/hod',HodCourseRoute)
app.use('/cbcs/staf',StafRoute)
app.use('/cbcs/staf',StaffCourseRoute)
app.use('/cbcs/COE',CoeRoutes)
app.use('/cbcs/COE',CoeAccessRoutes)
app.use('/cbcs/Dean',DeanRoutes)
app.use('/cbcs/Dean',DeanAccessRoute)
app.use((req, res, next) => {
    console.log(req.path, req.method,req.body)
    next()
  })
  PORT = 4000
mongoose.connect("mongodb+srv://ajithkumar200513:AJITH200536%40ak@sathyabama-cbcs.ue7lv.mongodb.net/myDatabase?retryWrites=true&w=majority")
  .then(() => {
    console.log('connected to database');
    app.listen(PORT, () => {
      console.log('listening for requests on port', PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });
