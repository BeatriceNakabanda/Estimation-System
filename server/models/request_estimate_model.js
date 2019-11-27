//requiring dependencies
const mongoose = require('mongoose')
const Schema = mongoose.Schema

//request Schema and model
/* const estimateRequestSchema = new Schema ({
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
    
}) */

//request schema
const estimateRequestSchema = new Schema ({
    _id: mongoose.Types.ObjectId,
    projectID: {type: String},
    developerID: {type: String},
    title: {type: String},
    projectManagerID: {type: String},
    dueDate: {type: Date},
    taskDescription: {type: String},
    dateCreated: {type: Date, default: Date.now},
    status: {type: String},
    createdDate: {type: Date, default: Date.now}
})

//estimate schema
const estimateSchema = new Schema ({
    _id: mongoose.Types.ObjectId,
    createdDate: {type: Date, default: Date.now},
    submittedDate: {type: Date, default: Date.now},
    developerID: String,
    totalSum: Number,
    lineItem: [lineItemSchema]
})

//lineItemSchema
const lineItemSchema = new Schema({
    description: mongoose.Types.Decimal128,
    research: mongoose.Types.Decimal128,
    planning: mongoose.Types.Decimal128,
    development: mongoose.Types.Decimal128,
    testing: mongoose.Types.Decimal128,
    stabilization: mongoose.Types.Decimal128,
    certainty: Number,
    sum: mongoose.Types.Decimal128,
    adjustedSum: mongoose.Types.Decimal128,
    comments: String
});




//defining request model
 const request = mongoose.model('estimateRequest', estimateRequestSchema)

 module.exports= request;

