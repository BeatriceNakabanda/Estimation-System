//requiring dependencies
const mongoose = require('mongoose')
const Schema = mongoose.Schema

//project schema and model
const ProjectSchema = new Schema({
    name: String,
})

const project = mongoose.model('project', ProjectSchema);

module.exports = project;