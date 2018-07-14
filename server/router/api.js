const express = require('express');
const router = express.Router();
const db = require('../mongoDB/db.js');
const userRouter = require('./user/user');
const interviewRouter = require('./interview/interview');
const uploadRouter = require('./interview/upload');

router.use(userRouter);
router.use(interviewRouter);
router.use(uploadRouter);

module.exports = router;

