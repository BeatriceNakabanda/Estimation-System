//requiring dependencies
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Defining EstimateRequestSchema
const EstimateRequestSchema = new Schema({
  project: { type: Schema.ObjectId, ref: "Project", required: true },
  developer: { type: Schema.ObjectId, ref: "User", required: true },
  title: { type: String },
  projectManager: { type: Schema.ObjectId, ref: "User" },
  dueDate: { type: String },
  DateEstimated: { type: Date, default: Date.now },
  taskDescription: { type: String },
  ResearchTotal: Number,
  PlanningTotal: Number,
  DevelopmentTotal: Number,
  testingTotal: Number,
  stabilizationTotal: Number,
  certaintyAverage: Number,
  SumTotal: Number,
  AdjustedTotal: Number,
  status: {
    type: String,
    enum: ["Draft", "Submitted", "Estimated"]
  },
  dateCreated: { type: Date, default: Date.now }
});

//exporting estimateRequest model
module.exports = mongoose.model("EstimateRequest", EstimateRequestSchema);
