const Admin = require("../models/Admin");
const jwt = require("jsonwebtoken");
const Doctor = require("../models/Doctor");
const Patient = require("../models/Patient");
const Medical = require("../models/MedicalHistory");
const Appointment = require("../models/Appointment");


const handleError = (err) => { };


const maxAge = 3 * 24 * 60 * 60;

const createtoken = (id) => {
    return jwt.sign({ id }, process.env.SECRET_KEY, {
        expiresIn: maxAge,
    });
}
module.exports.admin_signup = async (req, res) => {
    const { email, password } = req.body;

    try {
        const admin = await Admin.create({
            email,
            password,
        });
        const token = createtoken(admin._id);
        res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(201).json({ admin });
    } catch (err) {
        const errors = handleError(err);
        res.status(404).json({ errors });
    }
}



module.exports.admin_login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const admin = await Admin.login(email, password);
        const token = createtoken(admin._id);
        res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(200).json({ admin });
    } catch (err) {
        const errors = handleError(err);
        res.status(404).json({ errors });
    }
}

module.exports.add_Doctor = async (req, res) => {
    const { email, password, specilization, doctorName, docfees, address, contactno } = req.body;
    try {
        const doctor = await Doctor.create({
            email,
            password,
            specilization,
            doctorName,
            docfees,
            address,
            contactno,
        });
        res.status(201).json({ doctor });
    } catch (err) {
        const errors = handleError(err);
        res.status(404).json({ errors });
    };
};

module.exports.get_Doctors = async (req, res) => {
    try {
        const data = await Doctor.find();
        res.status(200).json({ data });
    } catch (err) {
        const errors = handleError(err);
        res.status(404).json({ errors });
    };

}

module.exports.edit_Doctor = async (req, res) => {
    const { specilization, doctorName, docfees, address, contactno } = req.body;
    const id = req.params.id;

    try {

        const data = await Doctor.updateOne(
            { _id: id },
            {
                $set: {
                    email,
                    password,
                    specilization,
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


module.exports.delete_Doctor = async (req, res) => {
    const id = req.params.id;
    try {
        const data = await Doctor.deleteOne({ _id: id });
        res.status(200).json({ data });
    } catch (err) {
        const errors = handleError(err);
        res.status(404).json({ errors });
    };

}


module.exports.add_Patient = async (req, res) => {
    const { email, password, doctorid, medicalhistid, patientName, address, contactno, gender, age } = req.body;
    try {
        const patient = await Patient.create({
            email,
            password,
            doctorid,
            medicalhistid,
            patientName,
            address,
            contactno,
            gender,
            age
        });
        res.status(201).json({ patient });
    } catch (err) {
        const errors = handleError(err);
        res.status(404).json({ errors });
    };
};

module.exports.get_Patients = async (req, res) => {
    try {
        const data = await Patient.find();
        res.status(200).json({ data });
    } catch (err) {
        const errors = handleError(err);
        res.status(404).json({ errors });
    };

}

module.exports.edit_Patient = async (req, res) => {
    const { email, password, doctorid, medicalhistid, patientName, address, contactno, gender, age } = req.body;
    const id = req.params.id;

    try {

        const data = await Patient.updateOne(
            { _id: id },
            {
                $set: {
                    email,
                    password,
                    doctorid,
                    medicalhistid,
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


module.exports.delete_Patient = async (req, res) => {
    const id = req.params.id;
    try {
        const data = await Patient.deleteOne({ _id: id });
        res.status(200).json({ data });
    } catch (err) {
        const errors = handleError(err);
        res.status(404).json({ errors });
    };

}


module.exports.add_MedicalHist = async (req, res) => {
    const { patientid, patientName, bloodPressure, bloodSugar, weight, medicalPres } = req.body;
    try {
        const medical = await Medical.create({
            patientid,
            patientName,
            bloodPressure,
            bloodSugar,
            weight,
            medicalPres
        });
        res.status(201).json({ medical });
    } catch (err) {
        const errors = handleError(err);
        res.status(404).json({ errors });
    };
};

module.exports.get_MedicalHists = async (req, res) => {
    try {
        const data = await Medical.find();
        res.status(200).json({ data });
    } catch (err) {
        const errors = handleError(err);
        res.status(404).json({ errors });
    };

}

module.exports.edit_MedicalHist = async (req, res) => {
    const { patientid, patientName, bloodPressure, bloodSugar, weight, medicalPres } = req.body;
    const id = req.params.id;

    try {

        const data = await Medical.updateOne(
            { _id: id },
            {
                $set: {
                    patientid,
                    patientName,
                    bloodPressure,
                    bloodSugar,
                    weight,
                    medicalPres
                }
            }
        );
        res.status(200).json(data);
    } catch (err) {
        const errors = handleError(err);
        res.status(404).json({ errors });
    };
}


module.exports.delete_MedicalHist = async (req, res) => {
    const id = req.params.id;
    try {
        const data = await Medical.deleteOne({ _id: id });
        res.status(200).json({ data });
    } catch (err) {
        const errors = handleError(err);
        res.status(404).json({ errors });
    };

}


module.exports.add_Appointment = async (req, res) => {
    const { patientid, doctorid, consultatancyfees, appointmentTime } = req.body;
    try {
        const appoint = await Appointment.create({
            patientid,
            doctorid,
            consultatancyfees,
            appointmentTime
        });
        res.status(201).json({ appoint });
    } catch (err) {
        const errors = handleError(err);
        res.status(404).json({ errors });
    };
};

module.exports.get_Appointments = async (req, res) => {
    try {
        const data = await Appointment.find();
        res.status(200).json({ data });
    } catch (err) {
        const errors = handleError(err);
        res.status(404).json({ errors });
    };

}

module.exports.edit_Appointment = async (req, res) => {
    const { patientid, doctorid, consultatancyfees, appointmentTime } = req.body;
    const id = req.params.id;

    try {

        const data = await Appointment.updateOne(
            { _id: id },
            {
                $set: {
                    patientid,
                    doctorid,
                    consultatancyfees,
                    appointmentTime
                }
            }
        );
        res.status(200).json(data);
    } catch (err) {
        const errors = handleError(err);
        res.status(404).json({ errors });
    };
}


module.exports.delete_Appointment = async (req, res) => {
    const id = req.params.id;
    try {
        const data = await Appointment.deleteOne({ _id: id });
        res.status(200).json({ data });
    } catch (err) {
        const errors = handleError(err);
        res.status(404).json({ errors });
    };

}