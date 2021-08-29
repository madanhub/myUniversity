/* Author - Akash Madan */

const mongoose = require('mongoose')

const withdrawResidenceSchema = {
    withdrawStudentID: String,
    withdrawStudentResidenceID: String,
    withdrawStudentEmail: {type: String, required: true, unique: true},
    withdrawStudentName: String,
    withdrawStudentNumber: String,
    withdrawRoomNumber: String,
    withdrawReason: String
}

module.exports = mongoose.model("WithdrawResidence", withdrawResidenceSchema)