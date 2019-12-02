//requiring dependencies
const mongoose = require('mongoose')
const Schema = mongoose.Schema

//request schema
const estimateRequestSchema = new Schema ({
    _id: mongoose.Types.ObjectId,
    project: {type: String},
    developer: {type: String},
    title: {type: String},
    projectManager: {type: String},
    dueDate: {type: Date},
    taskDescription: {type: String},
    dateCreated: {type: Date, default: Date.now},
    status: {type: String}
})

//defining request model
 const request = mongoose.model('estimateRequest', estimateRequestSchema)

module.exports= request;
