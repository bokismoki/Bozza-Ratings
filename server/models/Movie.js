const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true,
        minlength: 25
    },
    rating: {
        type: Number,
        default: 1
    },
    image: {
        type: String,
        required: true,
        trim: true
    },
    createdBy: {
        type: Object,
        required: true
    },
    createdOn: {
        type: Date,
        default: Date.now(),
        required: true
    }
});

module.exports = mongoose.model('Movie', MovieSchema);