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
    project: {type: String},
    developer: {type: String},
    title: {type: String},
    projectManager: {type: String},
    dueDate: {type: Date},
    taskDescription: {type: String},
    dateCreated: {type: Date, default: Date.now},
    status: {type: String},
    createdDate: {type: Date, default: Date.now}
})

//lineItemSchema
const lineItemSchema = new Schema({
    _id: mongoose.Types.ObjectId,
    description: mongoose.Types.Decimal128,
    research: mongoose.Types.Decimal128,
    planning: mongoose.Types.Decimal128,
    development: mongoose.Types.Decimal128,
    testing: mongoose.Types.Decimal128,
    stabilization: mongoose.Types.Decimal128,
    certainty: {type: Number},
    sum: mongoose.Types.Decimal128,
    adjustedSum: mongoose.Types.Decimal128,
    comments: {type: String}
});

//estimate schema
const estimateSchema = new Schema ({
    _id: {type: mongoose.Schema.Types.ObjectId, ref: 'estimateRequestSchema'},
    createdDate: {type: Date, default: Date.now},
    submittedDate: {type: Date, default: Date.now},
    developerID: {type: String},
    totalSum: {type: Number},
    lineItem: [lineItemSchema]
})


//defining request model
 const Request = mongoose.model('estimateRequest', estimateRequestSchema)

//estimate model
const Estimate = mongoose.model('estimate', estimateSchema)

 module.exports= Request;

