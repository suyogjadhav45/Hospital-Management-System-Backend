const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");


const patientSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Please enter email"],
        unique: true,
        lowercase: true,
        validate: [isEmail, "Please enter a valid email"],
    },
    password: {
        type: String,
        required: [true, "Please enter password"],
        minlength: [8, "Minimum length of password should must be 8 characters"],
    },
    doctorid: {
        type: mongoose.Schema.Types.ObjectId
    },
    medicalhistid:{
        type:mongoose.Schema.Types.ObjectId
    },
    patientName: {
        type: String,
        required: [true, "Please enter Doctor Name"],
        minlength: [3, "Minimum length should must be 3 characters"]
    },
    gender: {
        type: String,
        required: [true, "Please enter Gender"],
    },
    age: {
        type: Number,
        required: [true, "Please enter age"],
    },
    contactno: {
        type: Number,
        required: [true, "Please enter Number"],
        length:[10,"length should must be 10"]
    },
    address: {
        type: String,
        required: [true, "Please enter address"],
        minlength: [5, "Minimum length should must be 3 characters"]
    }
})


patientSchema.pre("save", async function(next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

patientSchema.statics.login = async function(next){
    const patient = await this.findOne({ email });
    if (patient) {
        const auth = await bcrypt.compare(password, patient.password);
        if (auth) return patient;
        else throw Error("Invalid Password");
    }
    else {
        throw Error("Invalid Email");
    }
}


const Patient = mongoose.model("patient", patientSchema);
module.exports = Patient;