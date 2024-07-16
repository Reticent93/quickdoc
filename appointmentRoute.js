const express = require("express");
const { db } = require("./firebase-config");

const router = express.Router();

//add an appointment
router.post("/appointments", async (req, res) => {
  try {
    const appointment = req.body;
    const docRef = await db.collection("appointments").add(appointment);
    res.status(201).send(`Appointment created with ID: ${docRef.id}`);
  } catch (error) {
    res.status(400).send("Error creating appointment " + error.message);
  }
});

//get all appointment routes
router.get("/appointments", async (req, res) => {
  try {
    const snapshot = await db.collection("appointments").get();
    const appointments = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    res.status(200).json(appointments);
  } catch (error) {
    res.status(400).send("Error getting appointments " + error.message);
  }
});

//update an appointment
router.put("/appointments/:id", async (req, res) => {
  try {
    const appointmentId = req.params.id;
    const appointment = req.body;
    await db
      .collection("appointments")
      .doc(appointmentId)
      .set(appointment, { merge: true });
    res.status(200).json("Appointment updated");
  } catch (error) {
    res.status(400).send("Error updating appointment " + error.message);
  }
});

//delete an appointment
router.delete("appointments/:id", async (req, res) => {
  try {
    const appointmentId = req.params.id;
    await db.collection("appointments").doc(appointmentId).delete();
    res.status(200).send("Appointment deleted");
  } catch (error) {
    res.status(400).send("Error deleting appointment " + error.message);
  }
});

module.exports = router;
