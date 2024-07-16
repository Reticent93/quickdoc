require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");

const { db } = require("./firebase-config");

const app = express();
const port = process.env.PORT || 4040;

app.use(bodyParser.json());

app.post('/appointments', async (req, res) => {
    try {
        const appointment = req.body;
        const docRef = await db.collection('appointments').add(appointment);
        res.status(201).send(`Appointment created with ID: ${docRef.id}`)
    } catch (error) {
        res.status(400).send('Error creating appointment ' + error.message)
    }
})

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
