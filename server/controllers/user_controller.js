//requiring dependencies
const user = require("../models/users_model"); //users_model
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

//get all users
exports.usersList = function(req, res){
  user.find({}, function (next, user){
    if(next){
      res.send(next);
    }else{
      res.json(user);
    }
  });
};

//get all users who are developers
exports.usersDevelopers = function(req, res, next){
  user.find({role: "developer"}, function(developers){
    if(next){
      res.send(next);
    }else{
      res.json(developers)
    }
  })
};

//create user
exports.createUser = function(req, res,next){
  const newUser = new user(req.body);
  newUser.save(function(user){
    if(next){
      res.send(next);
    }else{
      res.json(user);
    }
  });
};

//get single user
exports.singleUser = function(req, res, next){
  user.findById({_id: req.params.requestId}, function(user){
    if(next){
      res.send(next);
    }else{
      res.json(user);
    }
  })
};
