const express = require('express')
const router    =express.Router()
const User =require('../models/user')
const {body,validationResult}=require('express-validator');
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken")
const jwtSecret= "MynameisTRammodiartschanne%@"
router.post("/createUser",[
body("email").isEmail(),
body("name").isLength({min:5}),
body("password","incorrect password").isLength({min:5})]
,async (req, res)=>{
 
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const salt=await bcrypt.genSalt(10);
    let secPass=await bcrypt.hash(req.body.password,salt)
    try{    
await User.create({
   
 name: req.body.name,
 email:req.body.email,
 password:secPass,
 location:req.body.location
})
res.json({success:true});

}catch(err){
console.log(err);
res.json({success:false})
}
})
router.post("/loginUser",[
    body("email").isEmail(),
   
    body("password","incorrect password").isLength({min:5})],async (req, res)=>{
      
        const errors=validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()})
        }
      let email=req.body.email;
        try{    
    let user=await User.findOne({email})
    if(!user){
        return res.status(400).json({errors:"try logging with correct credentials"})
    }
    const pwdCompare=await bcrypt.compare(req.body.password,user.password);
   if(! pwdCompare){
    return res.status(400).json({errors:"try logging with correct credentialsss"});
    
   }
   const data={
    user:{
        id:user.id
    }
   }
   const authToken=jwt.sign(data,jwtSecret)
    return res.json({success:true,authToken:authToken});
   
    }catch(err){
    console.log(err);
    res.json({success:false})
    }
    })

router.get('/test',(req,res)=>{
    res.json({success : true , message : "Server responds"})
   res.send('Hello World!')
})
module.exports=router;
