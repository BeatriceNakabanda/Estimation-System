//requiring dependencies
const mongoose = require('mongoose')
const Schema = mongoose.Schema

//request schema
const estimateRequestSchema = new Schema ({
    project: {type: String},
    developer: {type: String},
    dueDate: {type: Date},
    title: {type: String},
    taskDescription: {type: String},
    dateCreated: {type: Date, default: Date.now}
})

//defining request model
 const request = mongoose.model('estimateRequest', estimateRequestSchema)

module.exports= request;
