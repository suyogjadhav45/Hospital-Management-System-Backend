const jwt = require("jsonwebtoken");
const Patient = require("../models/Patient");

const requirePatientAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.SECRET_KEY, async (err, decodedToken) => {
      if (err) {
        let AuthError = { error: "Patient is not authenticated!" };

        res.status(401).send({ AuthError });
      } else {
        const patient = await Patient.findById(decodedToken.id);
        if (patient) {
          req.Patient = patient;
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

module.exports = { requirePatientAuth };