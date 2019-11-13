const mongoose = require("mongoose");
//creating schema object called schema
const Schema = mongoose.Schema;
// Create User schema which is the object of schema
const UserSchema = new Schema({});

module.exports = User = mongoose.model("estimate", UserSchema);
// estimate is the name of the table/collection
