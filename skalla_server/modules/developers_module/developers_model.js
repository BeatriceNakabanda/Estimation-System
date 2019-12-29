//requiring dependencies
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//developer schema and model
const DeveloperSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    role: {
        type: String, 
        required: true
    },
}, {
    timestamps: true
});

module.exports = mongoose.model("Developer", DeveloperSchema, 'Users');
