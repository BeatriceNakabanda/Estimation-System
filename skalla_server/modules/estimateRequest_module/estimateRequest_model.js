  //requiring dependencies
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Defining EstimateRequestSchema
const EstimateRequestSchema = new Schema({
  project: {type: Schema.ObjectId, ref: 'Project', required: true},
  developer: {type: Schema.ObjectId, ref: 'User'},
  title: { type: String, required: true },
  projectManager: {type: Schema.ObjectId, ref: 'User'},
  dueDate: { type: Date, required: true },
  taskDescription: { type: String, required: true },
  status: {type: String, required: true, enum: ['Created', 'Draft', 'Submitted', 'Estimated']},
  dateCreated: { type: Date, default: Date.now },
  estimateId: {type: Schema.ObjectId, ref: 'Estimate'}
});

//exporting estimateRequest model
module.exports = mongoose.model("EstimateRequest", EstimateRequestSchema);

