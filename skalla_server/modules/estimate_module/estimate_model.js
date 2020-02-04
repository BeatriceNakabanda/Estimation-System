//requiring dependencies
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//estimate schema
const estimateSchema = new Schema({
  submittedDate: { type: Date, default: Date.now },
  EstimateRequest: { type: Schema.ObjectId },

  developer: { type: Schema.ObjectId, ref: "User", required: true },
  //estimateRequest: { type: Schema.ObjectId, ref: "EstimateRequest" },
  totalSum: Number,
  task: String,
  research: Number,
  planning: Number,
  development: Number,
  testing: Number,
  stabilization: Number,
  certainty: Number,
  sum: Number,
  adjustedSum: Number,
  comments: String

  // lineItem: [lineItemSchema]
});

//estimate model
module.exports = mongoose.model("Estimate", estimateSchema);
//module.exports = mongoose.model("Estimate", lineItemSchema);
