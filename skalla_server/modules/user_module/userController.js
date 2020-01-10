const User = require('./user_model')
const mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);
const passport = require('passport');
const jwt = require('jsonwebtoken');

//get all users
exports.usersList = function(req, res, next){

  User.find({})
  .exec(function (err, usersrequest){
      if(err){
          return next(err);
      }else{
          res.json(usersrequest);
      }
  })
}

//get all projectManagers
exports.projectManagersList = function(req, res, next){

  User.find({role: "Project Manager"})
  .exec(function (err, projectManagerRequest){
      if(err){
          return next(err);
      }else{
          res.json(projectManagerRequest);
      }
  })
}

//get all developers
exports.developersList = function(req, res, next){

  User.find({role: "Developer"})
  .exec(function (err, developerRequest){
      if(err){
          return next(err);
      }else{
          res.json(developerRequest);
      }
  })
}

//get a single projectManager
exports.singleProjectManagerRequest = function(req, res, next){

  User.findById({_id: req.params.requestId})
  .exec(function (err, singleProjectManagerRequest){
      if(err){
          return next(err);
      }else{
          res.json(singleProjectManagerRequest);
      }
  })
}

//get a single developer
exports.singleDeveloperRequest = function(req, res, next){

  User.findById({_id: req.params.requestId})
  .exec(function (err, singleDeveloperRequest){
      if(err){
          return next(err);
      }else{
          res.json(singleDeveloperRequest);
      }
  })
}

//login user
exports.loginUser = function(){
    async (req, res, next) => {
        passport.authenticate('login', async (err, user, info) => { try {
            if(err || !user){
              const error = new Error('An Error occured')
              return next(error);
            }
            req.login(user, { session : false }, async (error) => {
              if( error ) return next(error)
              //We don't want to store the sensitive information such as the
              //user password in the token so we pick only the email and id
              const body = { _id : user._id, email : user.email, role: user.role };
              //Sign the JWT token and populate the payload with the user id email and role
              const token = jwt.sign({ user : body },'top_secret');
              //Send back the token to the user
              return res.json({ token });
            }); } catch (error) {
            return next(error);
          }
        })(req, res, next)
    };  
}