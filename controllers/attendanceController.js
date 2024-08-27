const Attendance = require("../models/attendance");
const { body, validationResult } = require("express-validator");

// Validation rules
const validationRules = () => [
  body("name").isString().withMessage("Name is Required"),
  body("roll").isString().withMessage("Roll is Required"),
  body("date").isString().withMessage("Date is Required"),
  body("attendance")
    .isBoolean()
    .withMessage("Attendance must be a boolean value"),
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Get all attendance records
const getAllAttendance = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 3;
    const skip = (page - 1) * limit;

    const totalCount = await Attendance.countDocuments();
    const attendances = await Attendance.find()
      .skip(skip)
      .limit(limit)
      .sort({ date: -1 });

    res.json({
      attendances,
      currentPage: page,
      totalPages: Math.ceil(totalCount / limit),
      totalCount,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new attendance record
const createAttendance = async (req, res) => {
  try {
    const [day, month, year] = req.body.date.split("-");
    const formattedDate = `${year}-${month}-${day}`;
    const attendance = new Attendance({
      name: req.body.name,
      roll: req.body.roll,
      date: new Date(formattedDate),
      attendance: req.body.attendance,
    });
    const newAttendance = await attendance.save();
    res.status(201).json(newAttendance);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get attendance by roll number
const getAttendanceByRoll = async (req, res) => {
  try {
    const rollNumber = req.params.roll;
    const student = await Attendance.findOne({ roll: rollNumber });
    if (!student) {
      return res.status(404).send("Student not found");
    }
    res.status(200).json(student);
  } catch (error) {
    res.status(500).send("Server error");
  }
};

// Update attendance record
const updateAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.findById(req.params.id);
    if (!attendance) {
      return res.status(404).json({ message: "Attendance record not found" });
    }
    if (req.body.attendance != null) {
      attendance.attendance = req.body.attendance;
    }
    const updatedAttendance = await attendance.save();
    res.status(200).json(updatedAttendance);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete attendance record
const deleteAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.findById(req.params.id);
    if (!attendance) {
      return res.status(404).json({ message: "Attendance record not found" });
    }
    await attendance.deleteOne();
    res.status(204).json({ message: "Attendance record deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllAttendance,
  createAttendance,
  getAttendanceByRoll,
  updateAttendance,
  deleteAttendance,
  validationRules,
  validate,
};
