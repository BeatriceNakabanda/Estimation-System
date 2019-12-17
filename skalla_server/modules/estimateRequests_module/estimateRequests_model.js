//requiring dependencies
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//estimate request schema and model
const EstimateRequestShema = new Schema({
  project: { type: String },
  developer: { type: String },
  title: { type: String },
  projectManager: { type: String },
  dueDate: { type: Date },
  taskDescription: { type: String },
  dateCreated: { type: Date, default: Date.now },
  status: { type: String }
});

//defining request model
const request = mongoose.model("estimaterequests", EstimateRequestShema);
module.exports = request;
