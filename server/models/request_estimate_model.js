//requiring dependencies
const mongoose = require('mongoose')
const Schema = mongoose.Schema

//request schema
const estimateRequestSchema = new Schema ({
    project: String,
    developer: String,
    dueDate: Date,
    title: String,
    taskDescription: String,
    dateCreated: {type: Date, default: Date.now}
})

//defining request model
 const request = mongoose.model('estimateRequest', estimateRequestSchema)

module.exports= request;
