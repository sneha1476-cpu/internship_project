const express = require('express')
const adminRouter = require('./routes/admin')
const authUser = require('./utils/auth')
const commonRouter = require('./routes/common_api')
const videoRouter = require('./routes/video')   
const courseRouter = require('./routes/course_api');

const app = express()

app.use(express.json())
// app.use(authUser)

// URL: http://localhost:4000/video/all-videos
app.use('/video', videoRouter)
// URL:http://localhost:4000/admin/enrolled-students
app.use('/admin', adminRouter)
// URL:http://localhost:4000/auth/login
app.use('/auth', commonRouter)
// URL:http://localhost:4000/courses/
// app.use('/courses', commonRouter)

app.use('/courses', courseRouter);

app.listen(4000, 'localhost', () => {
  console.log("Server is listening at port 4000")
});
