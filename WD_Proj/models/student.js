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

    isDeleted: {
        type: Boolean,
        default: false,
    },
    active: {
        type: Boolean,
        default: true,
    },
    createdby: {
        type: String,
        required: false,
    },
    updatedby: {
        type: String,
        required: false,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

const student = mongoose.model('student', studentSchema);
module.exports = student;