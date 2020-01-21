//requiring dependecies
const express = require("express");
const router = express.Router();
const estimateController = require("./estimate_controllers");
const loginController = require("../user_module/loginController");

//get all estimates for a given developer
router.get(
  "/pending-estimates/:requestedId",
  loginController.CheckToken,

  estimateController.estimateList
);
//get all draft estimates
router.get(
  "/draft-estimates",
  loginController.CheckToken,
  estimateController.estimatedraftList
);

//get all pending estimates
router.get(
  "/pending-estimates",
  loginController.CheckToken,
  estimateController.estimatependingList
);
//get all pending estimates
router.get(
  "/submitted-estimates",
  loginController.CheckToken,
  estimateController.estimatesubmittedList
);
//get a single estimate
router.get(
  "/estimate/:requestId",
  loginController.CheckToken,
  estimateController.singleEstimate
);

//create a single estimate
router.post(
  "/estimate",
  loginController.CheckToken,
  estimateController.createEstimate
);

//update a single estimate
router.put(
  "/estimate/:requestId",
  loginController.CheckToken,
  estimateController.updateEstimate
);

module.exports = router;
