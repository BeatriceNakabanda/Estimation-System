//requiring dependecies
const express = require("express");
const router = express.Router();
const estimateController = require("./estimate_controllers");
const loginController = require("../user_module/loginController");
// const loginController = require("../user_module/loginController");

//get all estimates
router.get(
  "/estimates",
  loginController.CheckToken,
  estimateController.estimateList
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
