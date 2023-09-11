const mongoose = require("mongoose");
const bcrypt = require("bcrypt");


const appointmentSchema = new mongoose.Schema({
  doctorid: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  patientid: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  consultatancyfees: {
    type: Number,
    required: [true, "Please enter Doctor Name"],
  },
  appointmentTime: {
    type: Date,
    required: [true, "Please enter Date"]
  },
})



const Appointment = mongoose.model("appointment", appointmentSchema);
module.exports = Appointment;