const express=require('express')
const pool=require('../db/pool')
const result=require('../utils/result')
const userRouter=express.Router()
const crypto_js=require('crypto-js')
const jwt=require('jsonwebtoken')
const config=require('../utils/config')




userRouter.post('/register',(req,res)=>{
    const {email,password,role}=req.body
    const sql=`insert into users (email,password,role) values (?,?,?)`
    const hashpwd=crypto_js.SHA256(password).toString()
    pool.query(sql,[email,hashpwd,role],(err,data)=>{
        res.send(result.createResult(err,data))
    })
})

userRouter.post('/login',(req,res)=>{
    const {email,password}=req.body
    const hashpwd=crypto_js.SHA256(password).toString()
    const sql=`select * from users where email=? and password=?`
    
    pool.query(sql,[email,hashpwd],(err,data)=>{
        if(err){
            res.send(result.createResult(err))
        }
        else if(data.length==0){
            res.send(result.createResult("Invalid email or password"))
        }
        else{
            const user=data[0]
            const payload={
                role:user.role,
                 email:user.email
            }
            const token=jwt.sign(payload,config.secret)
            const userData={             
                token
            }
            res.send(result.createResult(null,userData))
        }
        
    })

})
userRouter.get("/all-active-courses",(req,res)=>{
    const sql=`select * from courses`
    pool.query(sql,(err,data)=>{
        res.send(result.createResult(err,data));
    })
})


module.exports=userRouter


