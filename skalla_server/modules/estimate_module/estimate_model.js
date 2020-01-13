//requiring dependencies
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//lineItemSchema
const lineItemSchema = new Schema({
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
    estimateRequestId: {type: Schema.ObjectId, ref: 'EstimateRequest'},
    dateCreated: {type: Date, default: Date.now},
    submittedDate: {type: Date},
    developer: {type: Schema.ObjectId, ref: 'User', required: true},
    totalSum: mongoose.Types.Decimal128,
    lineItem: [lineItemSchema]
})

//estimate model
module.exports = mongoose.model('Estimate', estimateSchema)