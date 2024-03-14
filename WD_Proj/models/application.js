const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({


    
    student : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'student',
        required: true
    },

    slot : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'slot',
        required: true
    },

    status : {
        type: String,
        default: "Pending",
        required: true
    },

    createdAt: {
        type: Date,
        default: Date.now,
    }

});

const application = mongoose.model('application', applicationSchema);

module.exports = application;