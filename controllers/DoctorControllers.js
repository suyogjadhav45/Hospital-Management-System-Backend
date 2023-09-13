const jwt = require("jsonwebtoken");
const Patient = require("../models/Patient");
const Appointment = require("../models/Appointment");
const Doctor = require("../models/Doctor");
const Medical = require("../models/MedicalHistory");

const handleError = (err) => { };

const maxAge = 3 * 24 * 60 * 60;

const createtoken = (id) => {
    return jwt.sign({ id }, process.env.SECRET_KEY, {
        expiresIn: maxAge,
    });
}


module.exports.doctor_login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const doctor = await Doctor.login(email, password);
        const token = createtoken(doctor._id);
        res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(200).json({ doctor });
    } catch (err) {
        const errors = handleError(err);
        res.status(404).json({ errors });
    }
}

module.exports.edit_Details = async (req,res)=>{
    const { email, password, specilization, doctorName, docfees, address, contactno } = req.body;
    const id = req.Doctor._id;

    try {

        const data = await Doctor.updateOne(
            { _id: id },
            {
                $set: {
                    email,
                    password,
                    doctorName,
                    docfees,
                    address,
                    contactno,
                }
            }
        );
        res.status(200).json(data);
    } catch (err) {
        const errors = handleError(err);
        res.status(404).json({ errors });
    };
}

module.exports.show_Appointments = async (req,res)=>{
    const id = req.Doctor._id;
    try{
        const data=await Appointment.find({doctorid:id});
        res.status(200).json({data});
    }catch(err){
        const errors = handleError(err);
        res.status(404).json({ errors });
    }
}

module.exports.get_Patients = async (req, res) => {
    const id=req.Doctor;
    try {
        const data = await Patient.find({doctorid:id});
        res.status(200).json({ data });
    } catch (err) {
        const errors = handleError(err);
        res.status(404).json({ errors });
    };
}

module.exports.get_medicalHistory = async (req,res)=>{
    const id=req.params.id;
    try {
        const data = await Medical.find({patientid:id});
        res.status(200).json({ data });
    } catch (err) {
        const errors = handleError(err);
        res.status(404).json({ errors });
    };
}