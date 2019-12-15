//requiring dependencies
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//developer schema and model
const DeveloperSchema = new Schema({
  name: String
});

module.exports = mongoose.model("users", DeveloperSchema);
