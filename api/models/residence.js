/* Author - Akash Madan */

const mongoose = require('mongoose')

const residenceSchema = {
    studentID: String,
    name: String,
    number: String,
    gender: String,
    emailID: {type: String, required: true, unique: true},
    location: String,
    bedroomType: String,
    meal: String,
    term: String
}

module.exports = mongoose.model("Residence", residenceSchema)