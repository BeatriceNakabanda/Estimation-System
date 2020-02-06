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

    Object.assign(req.body, {
      EstimateRequest: response._id
    });
    var newEstimate = new Estimate(req.body);

    const createdEstimate = await newEstimate.save(newEstimate);

    res.send(createdEstimate);
    //console.log(createdEstimate);
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

    //res.send(estimates);

    res.send(estimates);
    //res.send(request);
  } catch (error) {
    res.send(error);
  }
};
//updating estimate request with the totals

exports.EstimateRequestUpdateEstimated = async function(req, res) {
  var time = new Date().getTime();
  var date = new Date(time);
  today = date.toString();
  try {
    const TheRequest = await EstimateRequest.findByIdAndUpdate(
      {
        _id: req.params.requestId
      },
      {
        status: "Estimated",
        DateEstimated: today
      }
    ).exec();

    res.json(TheRequest);
    console.log(response);
  } catch (e) {
    return e;
  }
};
//updating an estimate requests total
exports.EstimateRequestUpdateEstimateTotal = async function(req, res) {
  try {
    response = await EstimateRequest.findById({ _id: req.params.requestId });
    const estimates = await Estimate.find({
      EstimateRequest: response._id
    });

    // response.ResearchTotal = 0;
    for (var list = 1; list <= estimates.length; list++) {
      var count = list - 1;

      response.ResearchTotal += estimates[count].research;
      response.PlanningTotal += estimates[count].planning;
      response.DevelopmentTotal += estimates[count].development;
      response.testingTotal += estimates[count].testing;
      response.stabilizationTotal += estimates[count].stabilization;

      response.SumTotal += estimates[count].sum;
      response.AdjustedTotal += estimates[count].adjustedSum;

      response.certaintyAverage = estimates[count].certainty / estimates.length;
    }
    //console.log(response);

    const TheRequest = await EstimateRequest.findByIdAndUpdate(
      {
        _id: req.params.requestId
      },
      {
        ResearchTotal: response.ResearchTotal,
        PlanningTotal: response.PlanningTotal,
        DevelopmentTotal: response.DevelopmentTotal,
        testingTotal: response.testingTotal,
        stabilizationTotal: response.stabilizationTotal,
        certaintyAverage: response.certaintyAverage,
        SumTotal: response.SumTotal,
        AdjustedTotal: response.AdjustedTotal
      }
    ).exec();
    console.log(TheRequest);

    res.json(TheRequest);
  } catch (e) {
    return e;
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
