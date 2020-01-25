//requiring dependencies

const Estimate = require("./estimate_model");
const EstimateRequest = require("../estimateRequest_module/estimateRequest_model");

const mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);

//getting a project,project manager according to developer id when pending and draft
//for pending and drafts
exports.estimateList = function(req, res, next) {
  EstimateRequest.find({
    developer: req.params.requestedId,
    status: "Submitted"
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
//for Submitted
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
//creating an estimate
exports.createEstimate = function(req, res) {
  const newEstimate = new Estimate(req.body);
  newEstimate.save(function(estimate, next) {
    if (next) {
      res.send(next);
    } else {
      res.json(estimate);
    }
  });
};

//getting all estimates
exports.estimatesList = function(req, res, next) {
  Estimate.find({
    developer: req.params.requestedId
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
//editng an estimate
exports.editingEstimate = function(req, res) {
  Estimate.findByIdAndUpdate({ _id: req.params.requestId }, req.body, function(
    next,
    estimate
  ) {
    if (estimate !== null) {
      res.json(estimate);
    } else {
      res.send(next);
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

//changing status from submitted to estimated
exports.changingStatusToEstimated = function(req, res) {
  EstimateRequest.findByIdAndUpdate(
    { _id: req.params.requestId, developer: req.params.requestedId },
    { status: "Estimated" },
    function(next, estimate) {
      if (estimate !== null) {
        res.json(estimate);
      } else {
        res.send(next);
      }
    }
  );
};

exports.UniqueEstimateRequest = function(req, res, next) {
  EstimateRequest.find(
    {
      _id: req.params.requestId,
      developer: req.params.requestedId
    }
    // { status: "Estimated", dueDate: Date.now }
  )
    .populate({ path: "developer", select: "name-_id" })
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
//finding an estimate request and updating it according to developer
exports.EstimateRequestUpdate = function(req, res, next) {
  var today = Date.now;
  EstimateRequest.findByIdAndUpdate(
    {
      _id: req.params.requestId,
      developer: req.params.requestedId
    },
    { status: "Estimated", dueDate: today }
    //dueDate: Date.now
  ).exec(function(err, estimate) {
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

// EstimateRequest.findByIdAndUpdate(
//   { _id: req.params.requestId, developer: req.params.requestedId },
//   { status: "Estimated" },
//   function(next, estimate) {
//     if (estimate !== null) {
//       res.json(estimate);
//     } else {
//       res.send(next);
//     }
//   }
// );
