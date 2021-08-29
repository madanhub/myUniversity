const mongoose = require('mongoose')

const courseSchema = {
    name: String,
    discription: String,
    term: String,
    rated: Boolean,
    instructor: String,
    instructorRate: Number,
    courseRate: Number,
    comment: String,
    courseImage: String
}

module.exports = mongoose.model("Course", courseSchema)