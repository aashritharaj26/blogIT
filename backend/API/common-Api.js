const exp=require('express')
const commonapp=exp.Router()


commonapp.get('/common',(req,res)=>{
    res.send({message:'reply from common app'})
})


module.exports=commonapp;