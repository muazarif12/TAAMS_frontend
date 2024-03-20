const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
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
    degreeProgram: {
        type: String,
        
    },
    semester: {
        type: Number,
    },

    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const student = mongoose.model('student', studentSchema);
module.exports = student;