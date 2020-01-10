//requiring dependencies
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//main users schema
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

//developers schema specific for developer role
const developerSchema = new Schema({ 
    role: {
        type: String
    }
});

//projectManagersSchema specific for projectManager role
const projectManagerSchema = new Schema({
    role: {
        type: String
    }
});

//users model, developers model, projectManagers model
const User = mongoose.model('User', usersSchema, 'users');
User.ProjectManager = mongoose.model('Project Manager', projectManagerSchema, 'users');
User.Developer = mongoose.model('Developer', developerSchema, 'users');

module.exports = User