//requiring dependencies
const EstimateRequest = require("./estimateRequest_model");
const projectmodel = require("../project_module/project_model");
const developermodel = require("../user_module/user_model");
const mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);

//getting draft estimate request
exports.draftEstimatelist = function(req, res, next) {
  EstimateRequest.find({
    projectManager: req.params.requestedId,
    status: "Draft"
  })
    .populate({ path: "projectManager", select: "name-_id" })
    .populate({ path: "project", select: "name-_id" })
    .populate({ path: "developer", select: "name-_id" })
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
        return err;
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
//requesting estimates with status "Estimated", "Submitted"
exports.estimateRequestList = function(req, res, next) {
  EstimateRequest.find({
    projectManager: req.params.requestedId,
    status: { $in: ["Estimated", "Submitted"] }
  })

    .populate({ path: "projectManager", select: "name-_id" })
    .populate({ path: "project", select: "name-_id" })
    .populate({ path: "developer", select: "name-_id" })

    .exec(function(err, estimateRequest) {
      if (err) {
        return err;
      } else {
        res.json(estimateRequest);
      }
    });
};

//create estimate request

exports.createEstimateRequest = async function(req, res) {
  Object.assign(req.body, { DateEstimated: "" });
  const estimateRequest = new EstimateRequest(req.body);

  try {
    const createdEstimateRequest = await estimateRequest.save(estimateRequest);

    const project = await projectmodel.findById(estimateRequest.project);

    const developer = await developermodel.findById(estimateRequest.developer);

    createdEstimateRequest.developer = developer;
    createdEstimateRequest.project = project;
    res.send(createdEstimateRequest);
  } catch (e) {
    console.log(e);
    res.send(e);
  }
};

//get single estimate request
exports.singleEstimateRequest = function(req, res) {
  EstimateRequest.findById({ _id: req.params.requestId })
    .populate({ path: "project", select: "name-_id" })
    .populate({ path: "projectManager", select: "name" })

    .populate({ path: "developer", select: "name-_id" })
    .exec(function(err, estimateRequest) {
      if (err) {
        return err;
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
    function(err, estimateRequest) {
      if (estimateRequest !== null) {
        res.json(estimateRequest);
      } else {
        res.send(err);
      }
    }
  );
};
