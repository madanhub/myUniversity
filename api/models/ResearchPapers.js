const mongoose = require('mongoose')

const ResearchPapersSchema = {
    Name = String
}
module.exports = mongoose.model("ResearchPapers" , ResearchPapersSchema)
