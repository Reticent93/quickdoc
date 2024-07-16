require("dotenv").config();
const appointmentRoutes = require('./appointmentRoute');


const express = require("express");
const bodyParser = require("body-parser");

const { db } = require("./firebase-config");

const app = express();
const port = process.env.PORT || 4040;

app.use(bodyParser.json());

app.use('/appointments', appointmentRoutes);


app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
