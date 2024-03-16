const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    courseID: {
        type: Number,
        required: true,
        unique: true,
    },
    courseName: {
        type: String,
        required: true,
    },
    department: {
        type: String,
        required: true,
    },
    credits: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const course = mongoose.model('course', courseSchema);

module.exports = course;