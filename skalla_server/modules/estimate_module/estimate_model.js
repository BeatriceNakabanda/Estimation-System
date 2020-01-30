//requiring dependencies
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// mongoose.Types.Decimal128
//lineItemSchema
const lineItemSchema = new Schema({
  research: Number,
  planning: Number,
  development: Number,
  testing: Number,
  stabilization: Number,
  certainty: Number,
  sum: Number,
  adjustedSum: Number,
  comments: String
});

//estimate schema
const estimateSchema = new Schema({
  submittedDate: { type: Date, default: Date.now },
  developer: { type: Schema.ObjectId, ref: "User", required: true },
  totalSum: Number,
  lineItem: [lineItemSchema]
});

//estimate model
module.exports = mongoose.model("Estimate", estimateSchema);
//module.exports = mongoose.model("Estimate", lineItemSchema);
