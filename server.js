const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const attendanceRoutes = require("./routes/attendanceRoutes");
const authRoutes = require("./routes/authRoutes");
const authMiddleware = require("./middlware/authMiddleware");

dotenv.config();

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to Mongodb with error handling
mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("mongodb not connected", error));
// Use routes
app.use("/api/attendance", authMiddleware, attendanceRoutes); // Apply auth middleware to attendance routes
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
