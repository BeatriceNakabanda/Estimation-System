//requiring dependencies
const mongoose = require("mongoose")
const Schema = mongoose.Schema

//roles schema
const UserRolesSchema = new Schema({
    name: String
});

//user schema
const UserSchema = new Schema({
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
    role: {UserRolesSchema},
}, {timestamps: true});

//defining user model
 const User = mongoose.model('User', UserSchema);

 module.exports = User;

//declaring options
/* const options = {discriminatorKey: 'kind'};

const userSchema = new Schema({
    name: String,
    password: String,
    email: String,
    role: 
}, options);

const User = mongoose.model('User', userSchema);

const Developer = User.discriminator('Developer',
new Schema({
    role : String,
}, options));

const ProjectManager = User.discriminator('ProjectManager',
new Schema({
    role : String,
}, options));

module.exports = User, Developer, ProjectManager; */

/* const usersSchema = new Schema({
    name: String,
    password: String,
    email: String,
    role: String
});

const developerSchema = new Schema({ 
    name: String,
    password: String,
    role: String});
const projectManagerSchema = new Schema({
    name: String,
    password: String,
    role: String
});


const User = mongoose.model('User', usersSchema, 'users');
User.Developer = mongoose.model('Developer', developerSchema, 'users');
User.ProjectManager = mongoose.model('ProjectManager', projectManagerSchema, 'users'); */