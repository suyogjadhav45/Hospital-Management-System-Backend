const mongoose=require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");


const doctorSchema=new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Please enter email"],
        unique: true,
        lowercase: true,
        validate: [isEmail, "Please enter a valid email"],
      },
      password: {
        type: String,
        default:"test1234",
        required: [true, "Please enter password"],
        minlength: [8, "Minimum length of password should must be 8 characters"],
      },
      specilization:{
        type:String,
        required: [true, "Please enter Specilization"],
      },
      doctorName:{
        type:String,
        required:[true,"Please enter Doctor Name"],
        minlength:[3,"Minimum length should must be 3 characters"]
      },
      docfees:{
        type: Number,
        required:[true,"Please enter Doctor Name"],
      },
      contactno:{
        type: Number,
        required:[true,"Please enter Contact Number"],
        length:[10,"length must be 10"]
      },
      address:{
        type:String,
        required:[true,"Please enter address"],
        minlength:[5,"Minimum length should must be 3 characters"]  
      }
})


doctorSchema.pre("save",async function(next){
    const salt=await bcrypt.genSalt();
    this.password=await bcrypt.hash(this.password,salt);
    next();
})

doctorSchema.statics.login=async function(email,password){
    const doctor=await this.findOne({email});
    if(doctor){
        const auth=await bcrypt.compare(password,doctor.password);
        if(auth) return doctor;
        else throw Error("Invalid Password");
    }
    else{
        throw Error("Invalid Email");
    }
}


const Doctor=mongoose.model("doctor",doctorSchema);
module.exports=Doctor;