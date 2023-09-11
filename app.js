const express = require('express');
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const adminroute = require('./routes/adminRoutes');
const patientroute = require('./routes/patientRoutes');
const doctorroute = require('./routes/doctorRoutes');
const logoutroute = require('./routes/logoutRoute');


dotenv.config({ path: "./config.env" });

const app = express();

const dbURI = process.env.DATABASE;
const port = process.env.PORT || 5000;
let corsOptions = {
    origin: ["http://localhost:5500", "http://localhost:3000"],
};
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());


mongoose.connect(dbURI).then((result) => {
    console.log("Connected to mongoDB");
    app.listen(3000, () => {
        console.log('Server is running at port 3000');
    });
})


app.get('/', (req, res) => {
    res.send('Hello World');
})
app.use(adminroute);
app.use(patientroute);
app.use(doctorroute);
app.use(logoutroute);



