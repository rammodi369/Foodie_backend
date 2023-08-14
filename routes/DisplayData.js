const express = require('express')
const router=express.Router()
router.post("/foodData",(req,res)=>{
    try{
      res.send([global.food,global.food1])
    //   console.log(global.food);
    }catch(err){
         console.log(err)
    }
})
module.exports=router;