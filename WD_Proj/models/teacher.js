const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,

    },
    department: {
        type: String,
    },
    coursesTeaching: {
        type: [String],
    },
    sections: {
        type: [String],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const teacher = mongoose.model('teacher', teacherSchema);

module.exports = teacher;