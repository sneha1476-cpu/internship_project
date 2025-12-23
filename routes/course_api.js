const express = require('express');
const pool = require('../db/pool');
const auth = require('../middlewares/auth');
const admin = require('../middlewares/admin');
const result = require('../utils/result');

const router = express.Router();

router.get('/all', auth, admin, (req, res) => {
  const sql = 'SELECT * FROM courses';
  pool.query(sql, (err, data) => {
    res.send(result.createResult(err, data));
  });
});

router.post('/add', auth, admin, (req, res) => {
  const sql = 'INSERT INTO courses SET ?';
  pool.query(sql, req.body, (err) => {
    res.send(result.createResult(err, 'Course added successfully'));
  });
});

router.put('/update/:id', auth, admin, (req, res) => {
  const sql = 'UPDATE courses SET ? WHERE course_id = ?';
  pool.query(sql, [req.body, req.params.id], (err) => {
    res.send(result.createResult(err, 'Course updated successfully'));
  });
});

router.delete('/delete/:id', auth, admin, (req, res) => {
  const sql = 'DELETE FROM courses WHERE course_id = ?';
  pool.query(sql, [req.params.id], (err) => {
    res.send(result.createResult(err, 'Course deleted successfully'));
  });
});

module.exports = router;
