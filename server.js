const express = require('express')
const adminRouter = require('./routes/admin')
const authUser = require('./utils/auth')
const commonRouter = require('./routes/common_api')
const videoRouter = require('./routes/video')   // ✅ ADD THIS

const app = express()

app.use(express.json())
app.use(authUser)

// URL: http://localhost:4000/video/all-videos
app.use('/video', videoRouter)
// URL:http://localhost:4000/admin/enrolled-students
app.use('/admin', adminRouter)

app.use('/auth', commonRouter)
app.use('/courses', commonRouter)

app.listen(4000, 'localhost', () => {
  console.log("Server is listening at port 4000")
});
