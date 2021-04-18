const mongoose = require('mongoose')
const Schema = mongoose.Schema

const cinemaSchema = new mongoose.Schema({

    movieName: {
        type: String,
        required: true,
        trim: true
    },
    movieHour: {
        type: String,
        required: true,
    },
    moviePic: {
        type: String,
        required: true
    },
    releaseDate: {
        type: Date,
        required: true
    },
    cinema: {
        type: Number,
        required: true
    },
    numOfRows: {
        type: Number,
        required: true
    },
    numOfSeats: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
})


const Cinema = mongoose.model('Cinema', cinemaSchema)

module.exports = Cinema