const jwt = require("jsonwebtoken");
const Doctor = require("../models/Doctor");

const requireDoctorAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.SECRET_KEY, async (err, decodedToken) => {
      if (err) {
        let AuthError = { error: "Doctor is not authenticated!" };

        res.status(401).send({ AuthError });
      } else {
        const doctor = await Doctor.findById(decodedToken.id);
        if (doctor) {
          req.Doctor = doctor;
          next();
        } else {
          let AuthError = { error: "Patient is not authenticated!" };
          res.status(401).send({ AuthError });
        }
      }
    });
  } else {
    let AuthError = { error: "Patient is not authenticated!" };
    res.status(401).send({ AuthError });
  }
};

module.exports = { requireDoctorAuth };