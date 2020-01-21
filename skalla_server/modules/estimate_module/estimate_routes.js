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
//get all estimated  estimates information
router.get(
  "/estimated-estimates/:requestedId",
  loginController.CheckToken,
  estimateController.estimatedList
);
//getting draft estimates
router.get(
  "/draft-estimates/:requestedId",
  loginController.CheckToken,
  estimateController.estimatedraftList
);

//get all pending estimates
router.get(
  "/pending-estimate/:requestedId",
  loginController.CheckToken,
  estimateController.estimatePendingList
);
//get all pending estimates
router.get(
  "/submitted-estimates/:requestedId",
  loginController.CheckToken,
  estimateController.estimatesubmittedList
);

router.put(
  "/change-draft/:requestedId",
  loginController.CheckToken,
  estimateController.changingStatusToDraft
);
router.put(
  "/change-submitted/:requestedId",
  loginController.CheckToken,
  estimateController.changingStatusToSubmitted
);
//get a single estimate
router.get(
  "/estimate/:requestId",
  //loginController.CheckToken,
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
