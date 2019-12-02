//requiring dependencies
const mongoose = require('mongoose')
const Schema = mongoose.Schema

//request schema
const estimateRequestSchema = new Schema ({
    _id: mongoose.Types.ObjectId,
    project: {type: Schema.Types.ObjectId, ref: 'project'},
    developer: {type: Schema.Types.ObjectId, ref: 'user'},
    title: {type: String},
    projectManager: {type: Schema.Types.ObjectId, ref: 'user'},
    dueDate: {type: Date},
    taskDescription: {type: String},
    dateCreated: {type: Date, default: Date.now},
    status: {type: String}
})

//defining request model
 const request = mongoose.model('estimateRequest', estimateRequestSchema)

module.exports= request;
