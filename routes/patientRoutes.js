const Router=require('express');

const patientroute=Router();


patientroute.get('/patienttest',(req,res)=>{
    res.send("Patient Home Route Check");
});

module.exports=patientroute;
