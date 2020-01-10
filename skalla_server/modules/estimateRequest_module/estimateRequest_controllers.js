//requiring dependencies
const EstimateRequest = require("./estimateRequest_model");
const mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);

//get all estimateRequests
exports.estimateRequestList = function(req, res, next) {
  EstimateRequest.find({})
    // .populate('project', 'name')
    // .populate('developer', 'name')
    .exec(function(err, estimateRequest) {
      if (err) {
        return next(err);
      } else {
        res.json(estimateRequest);
      }
    });
};

//create estimate request
exports.createEstimateRequest = function(req, res) {
  const newEstimateRequest = new EstimateRequest(req.body);
  newEstimateRequest.save(function(estimateRequest, next) {
    if (next) {
      res.send(next);
    } else {
      res.json(estimateRequest);
    }
  });
};

//get single estimate request
exports.singleEstimateRequest = function(req, res) {
  EstimateRequest.findById({ _id: req.params.requestId }, function(
    next,
    estimateRequest
  ) {
    if (next) {
      res.send(next);
    } else {
      res.json(estimateRequest);
    }
  });
};
//update single estimate request
exports.updateEstimateRequest = function(req, res) {
  EstimateRequest.findByIdAndUpdate(
    { _id: req.params.requestId },
    req.body,
    function(next, estimateRequest) {
      if (EstimateRequest !== null) {
        res.json(EstimateRequest);
      } else {
        res.send(next);
      }
    }
  );
};
