//requiring dependencies
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const bcrypt = require("bcryptjs");
mongoose.set('useCreateIndex', true);

//main users schema
const usersSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique : true
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

//making sure that the user trying to log in has the correct credentials
usersSchema.methods.isValidPassword = async function(password){
    //const user = this;
    const salt = await bcrypt.genSalt(10);
        var hashPassword = await bcrypt.hash(password, salt);
          password = hashPassword;

    //Hashes the password sent by the user for login and checks if the hashed password stored in the 
    //database matches the one sent. Returns true if it does else false.
    const compare = await compare(password, user.password);
    return compare;
  }

//users model, developers model, projectManagers model
const User = mongoose.model('User', usersSchema, 'users');
User.ProjectManager = mongoose.model('Project Manager', projectManagerSchema, 'users');
User.Developer = mongoose.model('Developer', developerSchema, 'users');

module.exports = User