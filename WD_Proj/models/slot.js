const mongoose = require('mongoose');

const slotSchema = new mongoose.Schema({
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'teacher', // Reference to the teacher model 
        required: true
    },
    course: {
        type: String,
        required: true,
    },
    courseId: {
        type: String,
        required: true,
    },
    sectionId: {
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: false,
    },
    requirements: {
        type: String,
        required: false,
    },
    duration: {
        type: String,
        required: false,
    },
    workHours:{
        type: String,
        required: false,
    },
    applicationDeadline:{
        type: Date,
        required: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    
});

const slot = mongoose.model('slot', slotSchema);

module.exports = slot;