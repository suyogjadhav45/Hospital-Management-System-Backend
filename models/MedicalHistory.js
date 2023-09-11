const mongoose = require("mongoose");



const medicalhistorySchema = new mongoose.Schema({
    patientid: {
        type: mongoose.Schema.Types.ObjectId
    },
    patientName: {
        type: String,
        required: [true, "Please enter Doctor Name"],
        minlength: [3, "Minimum length should must be 3 characters"]
    },
    bloodPressure: {
        type: Number,
        required: [true, "Please enter BP"],
    },
    bloodSugar: {
        type: Number,
        required: [true, "Please enter Blood Sugar"],
    },
    weight: {
        type: Number,
        required: [true, "Please enter weight"],
    },
    medicalPres: {
        type: String,
    }

})




const Medical = mongoose.model("medical", medicalhistorySchema);
module.exports = Medical;