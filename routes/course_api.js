const express = require('express');
const pool = require('../db/pool');
const auth = require('../middlewares/auth');
const admin = require('../middlewares/admin');
const result = require('../utils/result');

const router = express.Router();

router.get('/all-courses', auth, (req, res) => {
  const { startDate, endDate } = req.query;

  let sql = 'SELECT * FROM courses';
  const params = [];

  if (startDate && endDate) {
    sql += ' WHERE start_date >= ? AND end_date <= ?';
    params.push(startDate, endDate);
  }

  pool.query(sql, params, (err, data) => {
    res.send(result.createResult(err, data));
  });
});

router.post('/add', auth, admin, (req, res) => {
  const {
    courseName,
    description,
    fees,
    startDate,
    endDate,
    videoExpireDays
  } = req.body;

  const sql = `
    INSERT INTO courses
    (course_name, description, fees, start_date, end_date, video_expire_days)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  pool.query(
    sql,
    [courseName, description, fees, startDate, endDate, videoExpireDays],
    (err) => {
      res.send(result.createResult(err, 'Course added successfully'));
    }
  );
});

router.put('/update/:courseId', auth, admin, (req, res) => {
  const { courseId } = req.params;

  const {
    courseName,
    description,
    fees,
    startDate,
    endDate,
    videoExpireDays
  } = req.body;

  const sql = `
    UPDATE courses
    SET course_name = ?, description = ?, fees = ?, 
        start_date = ?, end_date = ?, video_expire_days = ?
    WHERE course_id = ?
  `;

  pool.query(
    sql,
    [
      courseName,
      description,
      fees,
      startDate,
      endDate,
      videoExpireDays,
      courseId
    ],
    (err) => {
      res.send(result.createResult(err, 'Course updated successfully'));
    }
  );
});

router.delete('/delete/:courseId', auth, admin, (req, res) => {
  const { courseId } = req.params;

  const sql = 'DELETE FROM courses WHERE course_id = ?';

  pool.query(sql, [courseId], (err) => {
    res.send(result.createResult(err, 'Course deleted successfully'));
  });
});

module.exports = router;
