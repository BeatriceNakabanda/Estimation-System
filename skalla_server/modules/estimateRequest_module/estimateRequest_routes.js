//requiring dependecies
const express = require("express")
const router = express.Router(); 
const estimateRequestController = require('./estimateRequest_controllers')

//All estimate request routes
//get all estimates
router.get("/estimate-requests", estimateRequestController.EstimateRequestList)

//create estimate
router.post("/estimate-request", estimateRequestController.createEstimateRequest)

//get single estimate
router.get("/estimate-request/:requestId", estimateRequestController.singleEstimateRequest)

//update single estimate
router.put("/estimate-request/:requestId", estimateRequestController.updateEstimateRequest)

module.exports = router