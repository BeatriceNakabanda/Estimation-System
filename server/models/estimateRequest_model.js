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


//request schema
const estimateRequestSchema = new Schema ({
    // const date = new Date();
    // date.toDateString();

    title: String,
    project: String,
    projectManager: String,
    developer: String,
    dueDate: {Type: Date},
    taskDescription: String,
    dateCreated: {Type: Date, default: Date.now},
    status: String,
    lineItem: [lineItemSchema]
})

//defining request model
 const request = mongoose.model('estimateRequest', estimateRequestSchema)

 module.exports= request;
