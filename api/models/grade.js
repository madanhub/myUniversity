//Author - Sowmya Busanagari
const mongoose = require('mongoose')

const GradeSchema = {
    studentEmail: Object,
    studentId: Object,
    studentName: Object,
    courseName: String,
    courseId: String,
    feedback: String,
    gradeMark:String,

}

module.exports = mongoose.model("Grade", GradeSchema)