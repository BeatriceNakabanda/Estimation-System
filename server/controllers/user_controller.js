//requiring dependencies
const user = require("../models/users_model"); //users_model
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

//get all users
exports.usersList = function(req, res){
  user.find({}, function (user, next){
    if(next){
      res.send(next);
    }else{
      res.json(user);
    }
  });
};

//get all users who are developers
exports.usersDevelopers = function(req, res){
  user.find({role: "developer"}, function(developers, next){
    if(next){
      res.send(next);
    }else{
      res.json(developers)
    }
  })
};

//create user
exports.createUser = function(req, res){
  const newUser = new user(req.body);
  newUser.save(function(user, next){
    if(next){
      res.send(next);
    }else{
      res.json(user);
    }
  });
};

//get single user
exports.singleUser = function(req, res){
  user.findById({_id: req.params.requestId}, function(user, next){
    if(next){
      res.send(next);
    }else{
      res.json(user);
    }
  })
};
