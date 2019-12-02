//requiring dependencies
const mongoose = require("mongoose")
const Schema = mongoose.Schema

//user schema
const userSchema = new Schema({
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
    role: {String},
}, {timestamps: true});


//defining user model
 const User = mongoose.model('User', userSchema);

 module.exports = User;