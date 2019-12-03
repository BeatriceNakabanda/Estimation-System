//requiring dependencies
const mongoose = require('mongoose')
const Schema = mongoose.Schema

//lineItemSchema for what lineItem should have
const lineItemSchema = new Schema({
    id: {type: String},
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

//estimate schema for what an estimate should have
const estimateSchema = new Schema ({
    id: {type: String},
    dateCreated: {type: Date, default: Date.now},
    submittedDate: {type: Date},
    developerId: {type: String},
    totalSum: {type: mongoose.Types.Decimal128},
    totalAdjstedSum: {type: mongoose.Types.Decimal128},
    status: {type: String},
    lineItem: [lineItemSchema]
})

//estimate model
const estimate = mongoose.model('estimate', estimateSchema)

module.exports = estimate;