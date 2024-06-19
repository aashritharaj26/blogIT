//create exp app
const exp=require('express')
const app=exp()
require('dotenv').config()   //process.env.PORT
const mc=require('mongodb').MongoClient
const path=require('path')
//deploy react build in this server
//app.use(exp.static(path.join(__dirname,'../client/blogdb/build')))
//join fe and be
//connect to mongodb server
//mc.connect('mongodb://localhost:27017')
mc.connect(process.env.DB_URL)
.then(client=>{
const blogdb=client.db('blogdb')
const usercollection=blogdb.collection('usercollection')
app.set('usercollection',usercollection)
const articlescollection=blogdb.collection('articlescollection')
app.set('articlescollection',articlescollection)
const authorscollection=blogdb.collection('authorscollection')
app.set('authorscollection',authorscollection)
console.log('db connnection success')
})
.catch(err=>console.log('err in connecting to db',err))
app.use(exp.json())
//if path starts with user-api send request to userapp
const userapp=require('./API/user-Api')
//if path starts with admin-api send request to userapp
const authorapp=require('./API/author-Api')
//if path starts with author-api send request to userapp
const adminapp=require('./API/admin-Api')

// Your routes here

app.use('/user-api',userapp)
app.use('/admin-api',adminapp)
app.use('/author-api',authorapp)
//deals with page refresh
//app.use((req,res,next)=>{
//    res.sendFile(path.join(__dirname,'../client/blogdb/build/index.html'))
//})
//assign port no
app.use((err,req,res,next)=>{
    res.send({message:'error',payload:err})
})
const port=process.env.PORT || 5000;
app.listen(4000,()=>console.log(`web server in port ${port}`))