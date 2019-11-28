//requiring dependencies
const mongoose = require("mongoose")
const Schema = mongoose.Schema

//roles schema
const UserRolesSchema = new Schema({
    developer : {type: String, required: true}
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