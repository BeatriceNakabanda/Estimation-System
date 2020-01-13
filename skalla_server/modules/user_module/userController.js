const User = require('./user_model')
const mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);

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
