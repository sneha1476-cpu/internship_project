const express=require('express')
const app=express()
const commonRouter=require('./routes/common_api')
app.use(express.json())

// URL:http://localhost:4000/auth/login
app.use('/auth',commonRouter)
// URL:http://localhost:4000/courses/
app.use('/courses',commonRouter)

app.listen(4000,'localhost',(req,res)=>{
    console.log("Server is listening at port 4000");
})

