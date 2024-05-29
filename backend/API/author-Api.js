const exp=require('express')
const authorapp=exp.Router()
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const expressAsyncHandler=require('express-async-handler')
const verifyToken=require('../middleware/verifyToken')

let authorscollection;
let articlescollection;
authorapp.use((req,res,next)=>{
    authorscollection=req.app.get('authorscollection')
    articlescollection=req.app.get('articlescollection')
    next()
})
authorapp.get('/test-author',(req,res)=>{
    res.send({message:'this is from admin api'})
})

authorapp.post('/register',expressAsyncHandler(async(req,res)=>{
    console.log(req.body)
    const newuser=req.body;
    //check fr duplicate user based on username
    const dbuser=await authorscollection.findOne({username:newuser.username})
//if user found in db
if(dbuser!=null){
    res.send({message:'user existed'})
}
else{
    //hash the password
    const hashedPassword=await bcrypt.hash(newuser.password,6)
   newuser.password=hashedPassword
   await authorscollection.insertOne(newuser)
   res.send({message:'user created'})
}
}))

//npm install express-async-handler
//user login
// User login
authorapp.post('/login', expressAsyncHandler(async (req, res) => {
    const userCred = req.body;
    // Check for username
    const dbuser = await authorscollection.findOne({username: userCred.username});
    if (dbuser === null || userCred.userType !== dbuser.userType) {
        res.send({message: 'Invalid username or user type'});
    } else {
        // Compare password with the hashed password in database
        const isPasswordCorrect = await bcrypt.compare(userCred.password, dbuser.password);
        if (!isPasswordCorrect) {
            res.send({message: 'Invalid password'});
            console.log('Invalid password');
        } else {
            // JWT token generation on successful login
            const signedToken = jwt.sign({username: dbuser.username}, process.env.SECRET_KEY, {expiresIn: '1d'});
            res.send({
                message: 'login success',
                token: signedToken,
                user: {
                    username: dbuser.username,
                    userType: dbuser.userType
                }
            });
        }
    }
}));


//get aricles of all users
authorapp.get('/articles/:username',verifyToken,expressAsyncHandler(async(req,res)=>{
    const authorname=req.params.username
    console.log(authorname)
    let articlesList=await articlescollection.find({username:authorname}).toArray()
    res.send({message:'list of articles',payload:articlesList})
}))
//adding article by autor
authorapp.post('/article',verifyToken,expressAsyncHandler(async(req,res)=>{
    const newarticle=req.body
    await articlescollection.insertOne(newarticle)
    res.send({message:"new article created",article:newarticle})
}))
//modify article by author

authorapp.put('/article',verifyToken,expressAsyncHandler(async(req,res)=>{
    //get modified article from client
    const modifiedArticle=req.body;
   
    //update by article id
   let result= await articlescollection.updateOne({articleId:modifiedArticle.articleId},{$set:{...modifiedArticle}})
    let latestArticle=await articlescollection.findOne({articleId:modifiedArticle.articleId})
    res.send({message:"Article modified",article:latestArticle})
}))


//delete article
authorapp.put('/article/:articleId',verifyToken,expressAsyncHandler(async(req,res)=>{
    //get articleId from url
    const artileIdFromUrl=Number(req.params.articleId);
    //get article 
    const articleToDelete=req.body;
    console.log(articleToDelete,artileIdFromUrl)
    if(articleToDelete.status===true){
       let modifiedArt = await articlescollection.findOneAndUpdate({articleId:artileIdFromUrl},{$set:{...articleToDelete,status:false}},{returnDocument:"after"})
       res.send({message:"article deleted",payload:modifiedArt.status})
    }
    if(articleToDelete.status===false){
        let modifiedArt = await articlescollection.findOneAndUpdate({articleId:artileIdFromUrl},{$set:{...articleToDelete,status:true}},{returnDocument:"after"})
        res.send({message:"article restored",payload:modifiedArt.status})
    }
}))

module.exports=authorapp;