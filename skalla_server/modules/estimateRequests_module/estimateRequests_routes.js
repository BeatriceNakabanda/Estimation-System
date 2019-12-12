//requiring dependecies
const express = require("express")
const router = express.Router(); 

//All estimate request routes
//get all estimates
router.get("/estimate-requests", estimateRequestController.estimatesList)

//create estimate
router.post("/estimate-request", estimateRequestController.createEstimate)

//get single estimate
router.get("/estimate-request/:requestId", estimateRequestController.singleEstimate)

//update single estimate
router.put("/estimate-request/:requestId", estimateRequestController.updateEstimate)