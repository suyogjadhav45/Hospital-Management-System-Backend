const mongoose=require("mongoose");
const bcrypt = require("bcrypt");


const appointmentSchema=new mongoose.Schema({
    doctorid: {
        type: mongoose.Schema.Types.ObjectId
    },
    patientid:{
        type:mongoose.Schema.Types.ObjectId
    },
      consultatancyfees:{
        type: Number,
        required:[true,"Please enter Doctor Name"],
      },
      appointmentTime:{
        type:Date,
        required:[true,"Please enter Date"]
      },
})



const Doctor=mongoose.model("doctor",appointmentSchema);
module.exports=Doctor;