//requiring dependencies
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const usersSchema = new Schema({
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
        Developer: {type: Schema.ObjectId, ref: 'Developer'},
        ProjectManager: {type: Schema.ObjectId, ref: 'Project Manager'}
    }
},
{
    timestamps: true
});

const developerSchema = new Schema({ 
    role: {
        type: String
    }
});
const projectManagerSchema = new Schema({
    role: {
        type: String
    }
});

const User = mongoose.model('User', usersSchema, 'users');
User.ProjectManager = mongoose.model('Project Manager', projectManagerSchema, 'users');
User.Developer = mongoose.model('Developer', developerSchema, 'users');

module.exports = User