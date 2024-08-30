const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const attendanceRoutes = require("./routes/attendanceRoutes");
const authRoutes = require("./routes/authRoutes");
const authMiddleware = require("./middlware/authMiddleware");
const PORT = 5000;
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to Mongodb with error handling
mongoose
  .connect("mongodb://localhost/student-attendance")
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("Could not connect to MongoDB:", error));

// Use routes
app.use("/api/attendance", authMiddleware, attendanceRoutes); // Apply auth middleware to attendance routes
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
