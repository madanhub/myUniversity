const mongoose = require('mongoose')

const libraryuserSchema = {
    Email: String,
    Password: String
}

module.exports = mongoose.model("libraryuser" , libraryuserSchema)