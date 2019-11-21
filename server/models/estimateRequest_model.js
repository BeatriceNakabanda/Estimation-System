//requiring dependencies
const mongoose = require('mongoose')
const Schema = mongoose.Schema

//request Schema and model
const estimateRequestSchema = new Schema ({
    title: {
        type: String,
    },
    taskDescription: {
        type: String,
    },
    project: {
        name: {type: mongoose.Schema.Types.ObjectId, ref: 'Project'},
    },
    developer: {
        type: String,
    },
    projectManager: {
        type: String,
    },
    dueDate: {
        type: Date,
    },
    status: {
        type: String,
    },
    createdDate: {
        type: Date,
        default: Date.now
    },
    
})

//defining request model
 const request = mongoose.model('estimateRequest', estimateRequestSchema)

 module.exports= request;
