const Router=require('express');
const { edit_Details, get_Patients, get_medicalHistory, doctor_login, show_Appointments } = require('../controllers/DoctorControllers');
const { requireDoctorAuth } = require('../middleware/doctorAuth');

const doctorroute=Router();

doctorroute.get('/doctortest',(req,res)=>{
    res.send("Doctor Home Route Check");
});

doctorroute.post("/login/doctor", doctor_login);
doctorroute.get("/showAppointments/doctor", requireDoctorAuth, show_Appointments);
doctorroute.post("/editDetails/doctor", requireDoctorAuth, edit_Details);
doctorroute.get("/getPatients/doctor", requireDoctorAuth, get_Patients);
doctorroute.get("/getMedicalHistory/doctor/:id", requireDoctorAuth, get_medicalHistory);

module.exports=doctorroute;