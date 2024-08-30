const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendanceController');
const authMiddleware = require('../middlware/authMiddleware'); // Adjust path as necessary

// Apply authMiddleware to all routes
router.use(authMiddleware);

router.get('/', attendanceController.getAllAttendance);
router.get('/attendance/:roll', attendanceController.getAttendanceByRoll);
router.post('/', attendanceController.validationRules(), attendanceController.validate, attendanceController.createAttendance);
router.patch('/:id', attendanceController.validationRules(), attendanceController.validate, attendanceController.updateAttendance);
router.delete('/:id', attendanceController.deleteAttendance);

module.exports = router;
