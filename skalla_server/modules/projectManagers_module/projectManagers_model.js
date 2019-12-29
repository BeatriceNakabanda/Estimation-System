//requiring dependencies
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//project manager schema and model
const ProjectManagerSchema = new Schema({
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


module.exports = mongoose.model("ProjectManager",  ProjectManagerSchema);
