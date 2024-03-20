const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    courseID: {
        type: String,
        required: true,
    },
    courseName: {
        type: String,
        required: true,
    },
    department: {
        type: String,
        required: false,
    },
    credits: {
        type: Number,
        required: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const course = mongoose.model('course', courseSchema);

module.exports = course;