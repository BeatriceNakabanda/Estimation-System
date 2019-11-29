//requiring dependencies
const mongoose = require('mongoose')
const Schema = mongoose.Schema


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
    _id: {type: mongoose.Schema.Types.ObjectId, ref: 'request'},
    dateCreated: {type: Date, default: Date.now},
    submittedDate: {type: Date},
    developerID: {type: String},
    totalSum: {type: Number},
    lineItem: [lineItemSchema]
})

//estimate model
const estimate = mongoose.model('estimate', estimateSchema)

module.exports = estimate;