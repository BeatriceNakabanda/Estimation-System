//requiring dependencies
const developer = require("../models/users_model"); //users_model
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

//get all users
exports.usersList = function(req, res){
  developer.find({}, function (developer, next){
    if(next){
      res.send(next);
    }else{
      res.json(developer);
    }
  });
};

//create user
exports.createUser = function(req, res){
  const newDeveloper = new developer(req.body);
  newDeveloper.save(function(developer, next){
    if(next){
      res.send(next);
    }else{
      res.json(developer);
    }
  });
};

//get single user
exports.singleUser = function(req, res){
  developer.findById({_id: req.params.requestId}, function(developer, next){
    if(next){
      res.send(next);
    }else{
      res.json(developer);
    }
  })
};

//update single user