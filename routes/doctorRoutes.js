const Router=require('express');

const doctorroute=Router();

doctorroute.get('/doctortest',(req,res)=>{
    res.send("Doctor Home Route Check");
});

module.exports=doctorroute;