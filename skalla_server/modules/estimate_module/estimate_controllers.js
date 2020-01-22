//requiring dependencies

const Estimate = require("./estimate_model");
const EstimateRequest = require("../estimateRequest_module/estimateRequest_model");

const mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);

//getting a project,project manager according to developer id when pending and draft

exports.estimateList = function(req, res, next) {
  EstimateRequest.find({
    status: "Submitted",
    developer: req.params.requestedId
  })
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

//getting when a developer estimates and sends back to project manager
exports.estimatedList = function(req, res, next) {
  EstimateRequest.find({
    developer: req.params.requestedId,
    status: "Estimated"
  })
    .populate({ path: "project", select: "name-_id" })
    .populate({ path: "projectManager", select: "name-_id" })
    .exec(function(err, estimate) {
      if (err) {
        return next(err);
      } else {
        res.json(estimate);
      }
    });
};
//getting pending draft estimates
exports.estimatedraftList = function(req, res, next) {
  Estimate.find({
    developer: req.params.requestedId,
    status: "Draft"
  })
    .populate({ path: "developer", select: "name-_id" })
    .exec(function(err, estimate) {
      if (err) {
        return next(err);
      } else {
        res.json(estimate);
      }
    });
};
//getting pending draft estimates
exports.estimatePendingList = function(req, res, next) {
  Estimate.find({
    developer: req.params.requestedId,
    status: "Pending"
  })
    .populate({ path: "developer", select: "name-_id" })
    .exec(function(err, estimate) {
      if (err) {
        return next(err);
      } else {
        res.json(estimate);
      }
    });
};
//getting submitted  estimates
exports.estimatesubmittedList = function(req, res, next) {
  Estimate.find({
    developer: req.params.requestedId,
    status: "Submitted"
  })
    .populate({ path: "developer", select: "name-_id" })
    .exec(function(err, estimate) {
      if (err) {
        return next(err);
      } else {
        res.json(estimate);
      }
    });
};
//changing status to draft
exports.changingStatusToDraft = function(req, res) {
  Estimate.findByIdAndUpdate(
    { _id: req.params.requestedId },
    { status: "Draft" },
    function(next, estimate) {
      if (estimate !== null) {
        res.json(estimate);
      } else {
        res.send(next);
      }
    }
  );
};
//changing status to submitted
exports.changingStatusToSubmitted = function(req, res) {
  Estimate.findByIdAndUpdate(
    { _id: req.params.requestedId },
    { status: "Submitted" },
    function(next, estimate) {
      if (estimate !== null) {
        res.json(estimate);
      } else {
        res.send(next);
      }
    }
  );
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
