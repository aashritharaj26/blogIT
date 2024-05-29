const exp=require('express')
const userapp=exp.Router()
const commonapp=require('./common-Api')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const expressAsyncHandler=require('express-async-handler')
const verifyToken = require('../middleware/verifyToken')
//get user collection app
require('dotenv').config()
userapp.use(exp.json());
let usercollection;
let articlescollection;
userapp.use((req,res,next)=>{
    usercollection=req.app.get('usercollection')
    articlescollection=req.app.get('articlescollection')
    next()
})

// userapp.get('/test-user',(req,res)=>{
//     res.send({message:'this is from user api'})
// })
//user registration route
userapp.post('/register',expressAsyncHandler(async(req,res)=>{
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
userapp.post('/login',expressAsyncHandler(async(req,res)=>{
    //get cred obj from client

    const userCred=req.body;
    //check for username
    const dbuser=await usercollection.findOne({username:userCred.username})
    const status=bcrypt.compare(userCred.password,dbuser.password)
    console.log(status,'status')
    if(dbuser===null|| userCred.userType!==dbuser.userType){
            res.send({message:'invalid credentials'})
    }
    else{
            const signedToken=jwt.sign({username:dbuser.username},process.env.SECRET_KEY)
            res.send({message:'login success',token:signedToken,user:dbuser})
    }
    //jwt token
}))

//get aricles of all users
userapp.get('/articles',verifyToken,expressAsyncHandler(async(req,res)=>{
    let articles=await articlescollection.find({status:true}).toArray()
    res.send({message:'articles',payload:articles})
}))

userapp.post('/comment/:articleId',verifyToken,expressAsyncHandler(async(req,res)=>{
    let usercomment=req.body
    console.log(usercomment,"user comment")
    let articleId=req.params.articleId
    console.log(usercomment,articleId)
    let result=await articlescollection.updateOne({articleId:Number(articleId)},{$addToSet:{comments:usercomment}})
    console.log(result)
    res.send({message:'Comment created'})
}))

module.exports=userapp;