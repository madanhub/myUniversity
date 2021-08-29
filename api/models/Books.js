const mongoose = require('mongoose')

const BooksSchema = {
    Name = String
}
module.exports = mongoose.model("Books" , BooksSchema)
