const express = require('express');
const pool = require('../db/pool');
const result = require('../utils/result');

const router = express.Router();

// GET all videos (optional filter by courseId)
router.get('/all-videos', (req, res) => {
    const courseId = req.query.courseId;
    let sql = 'SELECT * FROM videos';
    const params = [];
    if (courseId) {
        sql += ' WHERE course_id = ?';
        params.push(courseId);
    }
    pool.query(sql, params, (error, data) => {
        res.send(result.createResult(error, data));
    });
});

// ADD a new video
router.post('/add', (req, res) => {
    const { courseId, title, youtubeURL, description } = req.body;
    const sql = 'INSERT INTO videos(course_id, title, youtube_url, description) VALUES(?,?,?,?)';
    pool.query(sql, [courseId, title, youtubeURL, description], (error, data) => {
        res.send(result.createResult(error, data));
    });
});

// UPDATE video by videoId
router.put('/update/:videoId', (req, res) => {
    const videoId = req.params.videoId;
    const { courseId, title, youtubeURL, description } = req.body||{};

    if (!courseId || !title) {
        return res.status(400).send({ status: 'error', error: 'courseId and title are required' });
    }

    const sql = 'UPDATE videos SET course_id=?, title=?, youtube_url=?, description=? WHERE video_id=?';
    pool.query(sql, [courseId, title, youtubeURL, description, videoId], (error, data) => {
        res.send(result.createResult(error, data));
    });
});


// DELETE video by videoId
router.delete('/delete/:videoId', (req, res) => {
    const videoId = req.params.videoId;
    const sql = 'DELETE FROM videos WHERE video_id=?';
    pool.query(sql, [videoId], (error, data) => {
        res.send(result.createResult(error, data));
    });
});

module.exports = router;
