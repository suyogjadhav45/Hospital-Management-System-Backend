const Router=require('express');
const { requirePatientAuth } = require('../middleware/patientAuth');
const { patient_login, set_appointment, edit_Details, get_Doctors, personal_MedicalHistory } = require('../controllers/PatientControllers');

const patientroute=Router();


patientroute.get('/patienttest',(req,res)=>{
    res.send("Patient Home Route Check");
});

patientroute.post("/login/patient",patient_login);
patientroute.post("/setAppointment/patient",requirePatientAuth,set_appointment);
patientroute.post("/editDetails/patient",requirePatientAuth,edit_Details);
patientroute.get("/getDoctors/patient",requirePatientAuth,get_Doctors);
patientroute.get("/medicalHistory/patient",requirePatientAuth,personal_MedicalHistory);


module.exports=patientroute;
