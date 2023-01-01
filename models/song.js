const mongoose = require('mongoose')


const notesSchema = new mongoose.Schema({
    key : {
        type: String,
        required : true
    },
    startTime: {
        type: Number,
        required: true
    }
})

const songSchema = new mongoose.Schema({
    notes : [notesSchema]
})

module.exports = mongoose.model('Songs',songSchema)