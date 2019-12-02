//requiring dependencies
const request = require("../models/request_estimate_model"); //estimateRequest_model
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

//get all estimate requests
exports.estimatesList = function(req, res){
  request.find({}, function (next, estimate){
    if(next){
      res.send(next);
    }else{
      res.json(estimate);
    }
  });
}; 

//create estimate request
exports.createEstimate = function(req, res){
  const newEstimate = new request(req.body);
  newEstimate.save(function(next, estimate){
    if(next){
      res.send(next);
    }else{
      res.json(estimate);
    }
  });
};

//get single estimate request
exports.singleEstimate = function(req, res){
  request.findById({_id: req.params.requestId}, function(next, estimate){
    if(next){
      res.send(next);
    }else{
      res.json(estimate);
    }
  })
};

//update single estimate request
exports.updateEstimate = function(req, res){
  request.findByIdAndUpdate({_id: req.params.requestId}, req.body, function(next, estimate){
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