const mongoose = require("mongoose");

// Define the schema
const attendanceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  roll: { type: String, required: true },
  date: { type: Date, required: true },
  attendance: { type: Boolean, required: true },
});

// Create the model
const Attendance = mongoose.model("Attendance", attendanceSchema);

module.exports = Attendance;
