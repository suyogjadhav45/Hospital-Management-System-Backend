const Router = require('express');
const {
    admin_signup,
    admin_login,
    add_Doctor,
    edit_Doctor,
    get_Doctors,
    delete_Doctor,
    get_Patients,
    add_Patient,
    delete_Patient,
    edit_Patient,
    delete_MedicalHist,
    edit_MedicalHist,
    get_MedicalHists,
    add_MedicalHist,
    delete_Appointment,
    edit_Appointment,
    get_Appointments,
    add_Appointment

} = require("../controllers/AdminControllers");
const { requireAdminAuth } = require('../middleware/adminAuth');


const adminroute = Router();

adminroute.get('/admintest', (req, res) => {
    res.send("Admin Home Route Check");
})

adminroute.post("/signup/admin", admin_signup);
adminroute.post("/login/admin", admin_login);
adminroute.post("/addDoctor/admin", requireAdminAuth, add_Doctor);
adminroute.get("/getDoctors/admin", requireAdminAuth, get_Doctors);
adminroute.post("/editDoctor/admin/:id", requireAdminAuth, edit_Doctor);
adminroute.post("/deleteDoctor/admin/:id", requireAdminAuth, delete_Doctor);
adminroute.post("/addPatient/admin", requireAdminAuth, add_Patient);
adminroute.get("/getPatients/admin", requireAdminAuth, get_Patients);
adminroute.post("/editPatient/admin/:id", requireAdminAuth, edit_Patient);
adminroute.post("/deletePatient/admin/:id", requireAdminAuth, delete_Patient);
adminroute.post("/addMedicalHist/admin", requireAdminAuth, add_MedicalHist);
adminroute.get("/getMedicalHists/admin", requireAdminAuth, get_MedicalHists);
adminroute.post("/editMedicalHist/admin/:id", requireAdminAuth, edit_MedicalHist);
adminroute.post("/deleteMedicalHist/admin/:id", requireAdminAuth, delete_MedicalHist);
adminroute.post("/addAppointment/admin", requireAdminAuth, add_Appointment);
adminroute.get("/getAppointments/admin", requireAdminAuth, get_Appointments);
adminroute.post("/editAppointment/admin/:id", requireAdminAuth, edit_Appointment);
adminroute.post("/deleteAppointment/admin/:id", requireAdminAuth, delete_Appointment);

module.exports = adminroute;