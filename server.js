<<<<<<< HEAD
const express = require("express");
=======
const express = require('express')
const adminRouter = require('./routes/admin')
const authUser = require('./utils/auth')
const commonRouter = require('./routes/common_api')
const videoRouter = require('./routes/video')   
const courseRouter = require('./routes/course_api');
>>>>>>> 9a42bf8f27acc93d6d94ebe9485ddf573358c1fe

const commonRouter = require("./routes/common_api");
; // ✅ ADD THIS

<<<<<<< HEAD
const app = express();
app.use(express.json());
=======

app.use(express.json())
// app.use(authUser)
>>>>>>> 9a42bf8f27acc93d6d94ebe9485ddf573358c1fe

app.use("/auth", commonRouter);
// ✅ ADD THIS

<<<<<<< HEAD
app.listen(4000, () => {
  console.log("Server running on port 4000");
=======
app.use('/courses', courseRouter);

app.listen(4000, 'localhost', () => {
  console.log("Server is listening at port 4000")
>>>>>>> 9a42bf8f27acc93d6d94ebe9485ddf573358c1fe
});
