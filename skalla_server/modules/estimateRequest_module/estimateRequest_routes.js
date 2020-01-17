//requiring dependecies
const express = require("express");
const router = express.Router();
const estimateRequestController = require("./estimateRequest_controllers");
const loginController = require("../user_module/loginController");

//All estimate request routes
//get all estimates
router.get(
  "/estimate-requests",
  loginController.CheckToken,
  estimateRequestController.estimateRequestList
);

router.get(
  "/draft-estimates/request",
  loginController.CheckToken,
  estimateRequestController.draftEstimatelist
);

router.get(
  "/estimated",
  loginController.CheckToken,
  estimateRequestController.Estimatedlist
);
router.put(
  "/draft/:requestId",
  loginController.CheckToken,
  estimateRequestController.changingDraft
);
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

//get single estimate
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
