//requiring dependencies
const mongoose = require('mongoose')
const Schema = mongoose.Schema

//project schema and model
const ProjectSchema = new Schema({
    name: String,

})

const Project = mongoose.model('Project', ProjectSchema);

module.exports = Project;