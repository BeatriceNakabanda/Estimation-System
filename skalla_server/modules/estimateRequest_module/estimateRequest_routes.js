//requiring dependecies
const express = require("express");
const router = express.Router();
const estimateRequestController = require("./estimateRequest_controllers");
const loginController = require("../user_module/loginController");

//All estimate request routes
//get all estimates
router.get(
  "/estimate-requests/:requestedId",
  loginController.CheckToken,
  estimateRequestController.estimateRequestList
);
//getting draft estimates
router.get(
  "/draft-estimate-requests/:requestedId",
  loginController.CheckToken,
  estimateRequestController.draftEstimatelist
);
//getting estimated estimate requests
router.get(
  "/estimated",
  loginController.CheckToken,
  estimateRequestController.Estimatedlist
);

//changing to draft estimates
router.put(
  "/draft/:requestId",
  loginController.CheckToken,
  estimateRequestController.changingDraft
);
//changing to estimated request
router.put(
  "/estimate/:requestId",
  loginController.CheckToken,
  estimateRequestController.changingEstimated
);
//create estimate
router.post(
  "/estimate-request",
  loginController.CheckToken,

  estimateRequestController.createEstimateRequest
);

//get single estimate request
router.get(
  "/estimate-request/:requestId",
  loginController.CheckToken,
  estimateRequestController.singleEstimateRequest
);

//update single estimate
router.put(
  "/estimate-request/:requestId",
  loginController.CheckToken,
  estimateRequestController.updateEstimateRequest
);

module.exports = router;
