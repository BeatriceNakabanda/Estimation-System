//requiring dependencies
const developer = require("../models/users_model"); //users_model
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

//get all developers
exports.developersList = function(req, res){
  developer.find({}, function (developer, next){
    if(next){
      res.send(next);
    }else{
      res.json(developer);
    }
  });
};

//create developer
exports.createDeveloper = function(req, res){
  const newDeveloper = new developer(req.body);
  newDeveloper.save(function(developer, next){
    if(next){
      res.send(next);
    }else{
      res.json(developer);
    }
  });
};

//get single developer
exports.singleDeveloper = function(req, res){
  developer.findById({_id: req.params.requestId}, function(developer, next){
    if(next){
      res.send(next);
    }else{
      res.json(developer);
    }
  })
};

//update single developer