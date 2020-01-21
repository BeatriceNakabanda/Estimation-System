//requiring dependencies

const Estimate = require("./estimate_model");
const EstimateRequest = require("../estimateRequest_module/estimateRequest_model");

const mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);

//getting a project,project manager according to developer id
exports.estimateList = function(req, res, next) {
  EstimateRequest.find({ developer: req.params.requestedId })
    .populate({ path: "project", select: "name-_id" })
    .populate({ path: "projectManager", select: "name-_id" })
    .populate({ path: "developer", select: "name-_id" })
    .exec(function(err, estimate) {
      if (err) {
        return next(err);
      } else {
        res.json(estimate);
      }
    });
};

//get a single estimate
exports.singleEstimate = function(req, res, next) {
  Estimate.findById({ _id: req.params.requestId }).exec(function(
    err,
    estimate
  ) {
    if (err) {
      return next(err);
    } else {
      res.json(estimate);
    }
  });
};

//create estimate
exports.createEstimate = function(req, res, next) {
  const newEstimate = new Estimate(req.body);
  newEstimate.save({}).exec(function(err, estimate) {
    if (err) {
      return next(err);
    } else {
      res.json(estimate);
    }
  });
};

//update a single estimate
exports.updateEstimate = function(req, res, next) {
  Estimate.findByIdAndUpdate({ _id: req.params.requestId }, req.body).exec(
    function(err, estimate) {
      if (err) {
        return next(err);
      } else if (estimate !== null) {
        res.json(estimate);
      }
    }
  );
};
