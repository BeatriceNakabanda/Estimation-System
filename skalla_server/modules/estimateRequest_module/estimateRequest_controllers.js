//requiring dependencies
const EstimateRequest = require("./estimateRequest_model");
const mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);
//getting draft estimate request
exports.draftEstimatelist = function(req, res, next) {
  EstimateRequest.find({ status: "Draft" })
    .populate("project", "name")
    .populate("developer", "name")

    .exec(function(err, estimateRequest) {
      if (err) {
        return next(err);
      } else {
        res.json(estimateRequest);
      }
    });
};

//getting estimated requests
exports.Estimatedlist = function(req, res, next) {
  EstimateRequest.find({ status: "Estimated" })
    .populate("project", "name")
    .populate("developer", "name")

    .exec(function(err, estimateRequest) {
      if (err) {
        return next(err);
      } else {
        res.json(estimateRequest);
      }
    });
};

//changing status to draft
exports.changingDraft = function(req, res) {
  EstimateRequest.findByIdAndUpdate(
    { _id: req.params.requestId },
    { status: "Draft" },
    req.body,
    function(next, estimateRequest) {
      if (estimateRequest !== null) {
        res.json(estimateRequest);
      } else {
        res.send(next);
      }
    }
  );
};

//changing status to estimated
exports.changingEstimated = function(req, res) {
  EstimateRequest.findByIdAndUpdate(
    { _id: req.params.requestId },
    { status: "Estimated" },
    function(next, estimateRequest) {
      if (estimateRequest !== null) {
        res.json(estimateRequest);
      } else {
        res.send(next);
      }
    }
  );
};
//Model.findByIdAndUpdate(id, { name: 'jason bourne' }, options, callback)
//get all estimateRequests
exports.estimateRequestList = function(req, res, next) {
  EstimateRequest.find({ status: "Estimated" }, { status: "Submitted" })
    .populate("project", "name")
    .populate("developer", "name")
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
exports.singleEstimateRequest = function(req, res, next) {
  EstimateRequest.findById({ _id: req.params.requestId })
    .populate("projectManager", "name")
    .populate("project", "name")
    .exec(function(err, estimateRequest) {
      if (err) {
        return next(err);
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
      if (estimateRequest !== null) {
        res.json(estimateRequest);
      } else {
        res.send(next);
      }
    }
  );
};
