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


module.exports.patient_login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const patient = await Patient.login(email, password);
        const token = createtoken(patient._id);
        res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(200).json({ patient });
    } catch (err) {
        const errors = handleError(err);
        res.status(404).json({ errors });
    }
}

module.exports.set_appointment = async (req, res) => {
    const { doctorid, appointmentTime, consultatancyfees } = req.body;
    const patientid = req.Patient._id;
    try {
        const appointment = await Appointment.create({
            doctorid,
            patientid,
            appointmentTime,
            consultatancyfees
        });
        res.status(201).json({ appointment });
    }catch (err) {
        const errors = handleError(err);
        res.status(404).json({ errors });
    }
}

module.exports.edit_Details = async (req,res)=>{
    const { email, password, patientName, address, contactno, gender, age } = req.body;
    const id = req.Patient._id;

    try {

        const data = await Patient.updateOne(
            { _id: id },
            {
                $set: {
                    email,
                    password,
                    patientName,
                    address,
                    contactno,
                    gender,
                    age
                }
            }
        );
        res.status(200).json(data);
    } catch (err) {
        const errors = handleError(err);
        res.status(404).json({ errors });
    };
}

module.exports.get_Doctors = async (req, res) => {
    try {
        const data = await Doctor.find();
        res.status(200).json({ data });
    } catch (err) {
        const errors = handleError(err);
        res.status(404).json({ errors });
    };
}

module.exports.personal_MedicalHistory = async (req,res)=>{
    const id=req.Patient._id;
    try {
        const data = await Medical.find({patientid:id});
        res.status(200).json({ data });
    } catch (err) {
        const errors = handleError(err);
        res.status(404).json({ errors });
    };
}