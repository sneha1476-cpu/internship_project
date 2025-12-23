const express = require('express');
const pool = require('../db/pool');
const result = require('../utils/result');

const router = express.Router();

router.get('/enrolled-students', (req, res) => {
    const courseId = req.query.courseId;
    let sql = 'SELECT * FROM enrolled_students'; 
    const params = [];
    if (courseId) {
        sql += ' WHERE course_id = ?';
        params.push(courseId);
    }
    pool.query(sql, params, (error, data) => {
        res.send(result.createResult(error, data));
    });
});

module.exports = router;
