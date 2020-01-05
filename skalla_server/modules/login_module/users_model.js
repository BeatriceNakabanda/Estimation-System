const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//developer schema and model
const UserSchema = new Schema({

});

module.exports = mongoose.model("users", UserSchema);
