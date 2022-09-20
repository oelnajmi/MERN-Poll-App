const mongoose = require('mongoose')

const Schema = mongoose.Schema

const pollSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    firstPollOption: {
        type: String,
        required: true
    },
    secondPollOption: {
        type: String,
        required: true
    },
    firstPollResult: {
        type: Number,
        required: true
    },
    secondPollResult: {
        type: Number,
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model('Poll', pollSchema)