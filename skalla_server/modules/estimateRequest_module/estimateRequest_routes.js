//requiring dependecies
const express = require("express")
const router = express.Router(); 
const estimateRequestController = require('./estimateRequest_controllers')

//All estimate request routes
//get all estimates
router.get("/estimateRequests", estimateRequestController.EstimateRequestList)

//create estimate
router.post("/estimateRequest", estimateRequestController.createEstimateRequest)

//get single estimate
router.get("/estimateRequest/:requestId", estimateRequestController.singleEstimateRequest)

//update single estimate
router.put("/estimateRequest/:requestId", estimateRequestController.updateEstimateRequest)

module.exports = router