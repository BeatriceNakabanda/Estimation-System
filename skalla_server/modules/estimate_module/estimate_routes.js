//requiring dependecies
const express = require("express");
const router = express.Router();
const estimateController = require("./estimate_controllers");
// const loginController = require("../user_module/loginController");

//get all estimates
router.get("/estimates", estimateController.estimateList );

//get a single estimate
router.get("/estimate/:requestId", estimateController.singleEstimate);

//create a single estimate
// router.post("/estimate", () => { estimateController.createEstimate });

//update a single estimate
// router.put("/estimate/:requestId", () => { estimateController.updateEstimate });

module.exports = router;

