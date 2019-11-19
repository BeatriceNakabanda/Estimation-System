//requiring dependencies
const mongoose = require('mongoose')
const Schema = mongoose.Schema

//creating request Schema and model
const estimateRequestSchema = new Schema ({
    title: {
        type: String,
    },
    taskDescription: {
        type: String,
    },
    projectID: [
        {
        name: {type: String},
        },
    ],
    developerID: [
        {
        name: {type: String},
        },
    ],
    projectManagerID: {
        name: {type: String},
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