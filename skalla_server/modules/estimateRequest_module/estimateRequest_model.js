//requiring dependencies
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Defining EstimateRequestSchema
const EstimateRequestSchema = new Schema({
  project: { type: Schema.ObjectId, ref: "Project" },
  developer: { type: Schema.ObjectId, ref: "User" },
  title: { type: String },
  projectManager: { type: Schema.ObjectId, ref: "User" },
  dueDate: { type: String },
  taskDescription: { type: String },
  status: {
    type: String,
    enum: ["Draft", "Submitted", "Estimated", "In Progress"]
  },
  dateCreated: { type: Date, default: Date.now },
  estimateId: { type: Schema.ObjectId, ref: "Estimate" }
});

//exporting estimateRequest model
module.exports = mongoose.model("EstimateRequest", EstimateRequestSchema);
