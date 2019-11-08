onst mongoose = require("mongoose");
//creating schema object called schema
const Schema = mongoose.Schema;
// Create User schema which is the object of schema
const UserSchema = new Schema({
  title: {
    type: String,
    required: true
  },

  Project: {
    type: String,
    required: true
  },
  Developer: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  dueDate: {
    type: Date,
    required:true
  }
});

module.exports = User = mongoose.model("estimate", UserSchema);
// estimate is the name of the table/collection
