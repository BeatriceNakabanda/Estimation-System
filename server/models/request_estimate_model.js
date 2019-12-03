//requiring dependencies
const mongoose = require('mongoose')
const Schema = mongoose.Schema

//estimateRequest schema for what a request should have
const estimateRequestSchema = new Schema ({
    id: {type: String},
    projectId: {type: String},
    developerId: {type: String},
    projectManagerId: {type: String},
    dueDate: {type: Date},
    title: {type: String},
    taskDescription: {type: String},
    dateCreated: {type: Date, default: Date.now},
    status: {type: String}
})

//defining request model
 const request = mongoose.model('estimateRequest', estimateRequestSchema)

module.exports= request;
