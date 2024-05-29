const exp=require('express')
const adminapp=exp.Router()
//const commonapp=require('./common-Api')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const expressAsyncHandler=require('express-async-handler')
//get user collection app
require('dotenv').config()
adminapp.use(exp.json());
adminapp.use((req,res,next)=>{
    usercollection=req.app.get('usercollection')
    next()
})

adminapp.post('/register',expressAsyncHandler(async(req,res)=>{
    console.log(req.body)
    const newuser=req.body;
    //check fr duplicate user based on username
    const dbuser=await usercollection.findOne({username:newuser.username})
//if user found in db
if(dbuser!=null){
    res.send({message:'user existed'})
}
else{
    //hash the password
    const hashedPassword=await bcrypt.hash(newuser.password,6)
   newuser.password=hashedPassword
   await usercollection.insertOne(newuser)
   res.send({message:'user created'})
}
}))

//npm install express-async-handler
//user login
adminapp.post('/login',expressAsyncHandler(async(req,res)=>{
    //get cred obj from client

    const userCred=req.body;
    //check for username
    const dbuser=await usercollection.findOne({username:userCred.username})
    if(dbuser===null){
        res.send({message:'invalid username'})
    }
    else{
        const status=bcrypt.compare(userCred.password,dbuser.password)
        if(status===false){
            res.send({message:'invalid password'})
        }
        else{
            const signedToken=jwt.sign({username:dbuser.username},process.env.SECRET_KEY)
            res.send({message:'login success',token:signedToken,user:dbuser})
        }
    }
    //jwt token
}))

//get aricles of all users
adminapp.get('/articles',expressAsyncHandler(async(req,res)=>{
    const articlescollection=req.app.get('articlescollection')
    let articles=await articlescollection.find().toArray()
    res.send({message:'articles',payload:articles})
}))


module.exports=adminapp;