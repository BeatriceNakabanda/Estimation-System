//requiring dependecies
const express = require("express");
const router = express.Router();
const estimateController = require("./estimate_controllers");
const loginController = require("../user_module/loginController");

//get all estimates information for a given developer
router.get(
  "/pending-estimates/:requestedId",
  loginController.CheckToken,

  estimateController.estimateList
);

//getting a single estimate request information for a single developer

router.get(
  "/Unique-estimate/:requestId/:requestedId",
  loginController.CheckToken,

  estimateController.UniqueEstimateRequest
);

// updating a single estimate request information for a single developer
router.put(
  "/update-estimateRequest/:requestId/:requestedId",
  //loginController.CheckToken,

  estimateController.EstimateRequestUpdateEstimated
);
//get all estimated  estimates information
router.get(
  "/estimated-estimates/:requestedId",
  loginController.CheckToken,
  estimateController.estimatedList
);

//create a single estimate
router.post(
  "/create-estimate",
  //loginController.CheckToken,
  estimateController.createEstimate
);
//getting all to estimates
router.get(
  "/get-all-estimates/:requestedId",
  loginController.CheckToken,
  estimateController.estimatesList
);

//editing an estimate
router.put(
  "/editing-estimate/:requestedId",
  loginController.CheckToken,
  estimateController.editingEstimate
);

//get a single estimate
router.get(
  "/estimate/:requestId",
  //loginController.CheckToken,
  estimateController.singleEstimate
);

//getting submitted estimates

router.put(
  "/submitted-estimates/:requestedId",
  loginController.CheckToken,
  estimateController.changingStatusToEstimated
);

module.exports = router;
