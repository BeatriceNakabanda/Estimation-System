//requiring dependencies
const request = require("../models/estimateRequest_model"); //estimateRequest_model
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

//get all estimates
exports.estimatesList = function(req, res, next){
  request.find({}, function (estimate){
    if(next){
      res.send(next);
    }else{
      res.json(estimate);
    }
  });
};

//create estimate
exports.createEstimate = function(req, res, next){
  const newEstimate = new request(req.body);
  newEstimate.save(function(estimate){
    if(next){
      res.send(next);
    }else{
      res.json(estimate);
    }
  });
};

//get single estimate
exports.singleEstimate = function(req, res, next){
  request.findById({_id: req.params.requestId}, function(estimate){
    if(next){
      res.send(next);
    }else{
      res.json(estimate);
    }
  })
};

//update single estimate
exports.updateEstimate = function(req, res, next){
  request.findByIdAndUpdate({_id: req.params.requestId}, req.body, function(estimate){
    /* if(next)
        res.send(next);
        res.json(estimate) */
        if(estimate !== null){
          res.json(estimate)
        }else{
          res.send(next)
        }
  });
};