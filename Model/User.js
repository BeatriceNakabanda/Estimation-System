const mongoose = require("mongoose");
//creating schema object called schema
const Schema = mongoose.Schema;
// Create User schema which is the object of schema
const UserSchema = new Schema({
  title: {
    type: String,
     required: "this is required"
  },

  Project: {
    type: String,
    required: "this is required"
  },
  Developer: {
    type: String,
    required: "this is required"
  },
  password: {
    type: String,
    required: "this is required"
  },
  dueDate: {
    type: Date,
    required: "this is required"
  }
});

module.exports = User = mongoose.model("estimate", UserSchema);
// estimate is the name of the table/collection
