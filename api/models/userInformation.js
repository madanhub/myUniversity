const mongoose = require('mongoose')

const userInformationSchema = {
    FirstName: String,
    LastName: String,
    Password: String,
    ConfirmPassword: String,
    Email: String,
    Role:String,
    SecurityAnswer: String,
    PhoneNumber: String
}

module.exports = mongoose.model("userInformation", userInformationSchema)