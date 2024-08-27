const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const attendanceRoutes = require("./routes/attendanceRoutes");
const PORT = 3000;
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB with error handling
mongoose
  .connect("mongodb://localhost/student-attendance")
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("Could not connect to MongoDB:", error));

// Use routes
app.use("/api/attendance", attendanceRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
