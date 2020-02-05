//requiring dependencies

const Estimate = require("./estimate_model");
const EstimateRequest = require("../estimateRequest_module/estimateRequest_model");

const mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);

//getting a project,project manager according to developer id when pending and draft

exports.estimateRequestList = async function(req, res) {
  try {
    const estimaterequest = await EstimateRequest.find({
      developer: req.params.requestedId,
      status: "Submitted"
    })
      .populate({ path: "project", select: "name-_id" })
      .populate({ path: "projectManager", select: "name-_id" })
      .populate({ path: "developer", select: "name-_id" })
      .exec();
    res.send(estimaterequest);
  } catch (e) {
    return e;
  }
};
//getting a project,project manager according to developer id when pending and draft

exports.estimateRequestListEstimated = async function(req, res) {
  try {
    const estimaterequest = await EstimateRequest.find({
      developer: req.params.requestedId,
      status: "Estimated"
    })
      .populate({ path: "project", select: "name-_id" })
      .populate({ path: "projectManager", select: "name-_id" })

      .exec();
    res.send(estimaterequest);
  } catch (e) {
    return e;
  }
};
//getting when a developer estimates and sends back to project manager
//for Submitted
exports.estimatedList = function(req, res) {
  Estimate.find({
    EstimateRequest: req.params.requestId
  })

    .populate({ path: "developer", select: "name-_id" })
    .exec(function(err, estimate) {
      if (err) {
        return err;
      } else {
        res.json(estimate);
      }
    });
};

//creating an estimate

//create estimate
exports.createEstimate = async function(req, res) {
  try {
    response = await EstimateRequest.findById({ _id: req.params.requestId });
    console.log(response);
  } catch (e) {
    return e;
  }
  Object.assign(req.body, { EstimateRequest: response._id });
  var newEstimate = new Estimate(req.body);

  try {
    const createdEstimate = await newEstimate.save(newEstimate);

    res.send(createdEstimate);
  } catch (error) {
    res.send(error);
  }
};
// getting estimates from developer selected by project manager
exports.listOfEstimateRequest = async function(req, res) {
  try {
    const request = await EstimateRequest.find({
      _id: req.params.requestId,
      projectManager: req.params.projectManagerId
    });

    const estimates = await Estimate.find(
      {
        EstimateRequest: req.params.requestId,
        developer: request[0].developer
      }
      // estimateRequestID
    )
      .populate({ path: "developer", select: "name-_id" })
      .exec();

    res.send(estimates);
  } catch (error) {
    res.send(error);
  }
};

//getting all estimates

exports.estimatesList = function(req, res) {
  Estimate.find({
    developer: req.params.requestedId
  })
    .populate({ path: "developer", select: "name-_id" })

    .exec(function(err, estimate) {
      if (err) {
        return err;
      } else {
        res.json(estimate);
      }
    });
};
//editng an estimate
exports.editingEstimate = function(req, res) {
  Estimate.findByIdAndUpdate({ _id: req.params.requestId }, req.body, function(
    error,
    estimate
  ) {
    if (estimate !== null) {
      res.json(estimate);
    } else {
      res.send(error);
    }
  });
};

//get a single estimate
exports.singleEstimate = function(req, res, next) {
  Estimate.findById({ _id: req.params.requestId })

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
exports.estimateDraftList = function(req, res) {
  Estimate.find({
    developer: req.params.requestedId
  })
    .populate({ path: "developer", select: "name-_id" })
    .exec(function(err, estimate) {
      if (err) {
        return err;
      } else {
        res.json(estimate);
      }
    });
};
//getting submitted  estimates
exports.estimatesubmittedList = function(req, res) {
  Estimate.find({
    developer: req.params.requestedId,
    status: "Submitted"
  })
    .populate({ path: "developer", select: "name-_id" })
    .exec(function(err, estimate) {
      if (err) {
        return err;
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
    function(error, estimate) {
      if (estimate !== null) {
        res.json(estimate);
      } else {
        res.send(error);
      }
    }
  );
};

exports.UniqueEstimateRequest = function(req, res) {
  EstimateRequest.find({
    _id: req.params.requestId,
    developer: req.params.requestedId
  })
    .populate({ path: "developer", select: "name-_id" })
    .populate({ path: "project", select: "name-_id" })
    .populate({ path: "projectManager", select: "name-_id" })

    .exec(function(err, estimate) {
      if (err) {
        return err;
      } else {
        res.json(estimate);
      }
    });
};
//finding an estimate request and updating it according to developer
exports.EstimateRequestUpdateEstimated = async function(req, res) {
  var time = new Date().getTime();
  var date = new Date(time);
  today = date.toString();
  try {
    const response = await EstimateRequest.findByIdAndUpdate(
      {
        _id: req.params.requestId
      },
      { status: "Estimated", DateEstimated: today }
    ).exec();

    res.json(response);
    console.log(response);
  } catch (e) {
    return e;
  }
};

//update a single estimate

exports.updateEstimate = async function(req, res) {
  try {
    const estimate = await Estimate.findByIdAndUpdate(
      { _id: req.params.requestId },
      req.body
    ).exec();
    res.send(estimate);
  } catch (e) {
    return e;
  }
};
