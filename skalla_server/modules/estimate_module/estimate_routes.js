//requiring dependecies
const express = require("express");
const router = express.Router();
const estimateController = require("./estimate_controllers");
const loginController = require("../user_module/loginController");

//get all estimates information for a given developer
router.get(
  "/pending-estimates/:requestedId",
  //loginController.CheckToken,

  estimateController.estimateList
);
//get all estimated  estimates information
router.get(
  "/estimated-estimates/:requestedId",
  loginController.CheckToken,
  estimateController.estimatedList
);

//create a single estimate
router.post(
  "/create-estimate/:requestedId",
  loginController.CheckToken,
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
  //loginController.CheckToken,
  estimateController.editingEstimate
);

//get a single estimate
router.get(
  "/estimate/:requestId",
  //loginController.CheckToken,
  estimateController.singleEstimate
);

//getting draft estimates
// router.get(
//   "/draft-estimates/:requestedId",
//   //loginController.CheckToken,
//   estimateController.estimatedraftList
// );

//get all pending estimates
// router.get(
//   "/pending-estimate/:requestedId",
//   loginController.CheckToken,
//   estimateController.estimatePendingList
// );
// //get all submitted estimates
// router.get(
//   "/submitted-estimates/:requestedId",
//   loginController.CheckToken,
//   estimateController.estimatesubmittedList
// );

//changing to submitted
// router.put(
//   "/change-submitted/:requestedId",
//   loginController.CheckToken,
//   estimateController.changingStatusToSubmitted
// );

// //update a single estimate
// router.put(
//   "/estimate/:requestId",
//   loginController.CheckToken,
//   estimateController.updateEstimate
// );

module.exports = router;
