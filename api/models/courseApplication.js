//Author - Sowmya Busanagari
const mongoose = require('mongoose')

const courseApplicationSchema = {
    studentEmail: String,
    courseName: String,
    courseInstructor: String,
    courseId: String,
    courseRate: Number,
    applied: Boolean
}

module.exports = mongoose.model("CourseApplication", courseApplicationSchema)