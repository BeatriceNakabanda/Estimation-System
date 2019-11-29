//requiring dependecies
const express = require("express")
const router = express.Router();  //express router for routing
const estimateRequestController = require('../controllers/estimateRequest_controller')
const projectController = require('../controllers/project_controller')
const userController = require('../controllers/user_controller')


/* Listing estimate Routes */

//get all estimates
router.get("/estimates", estimateRequestController.estimatesList)

//create estimate
router.post("/estimate", estimateRequestController.createEstimate)

//get single estimate
router.get("/estimate/:requestId", estimateRequestController.singleEstimate)

//update single estimate
router.put("/estimate/:requestId", estimateRequestController.updateEstimate)


/* Listing Project Routes */

//get all projects
router.get("/projects", projectController.projectList)

//create project
router.post("/project", projectController.createProject)

/* Listing User Routes */

//get all users
router.get("/users", userController.usersList)

//get all users who are developers
router.get("/users/developers", userController.usersDevelopers)

//get all users who are projectManagers

//get a single user
router.get("/user/:requestId", userController.singleUser)

//create user
router.post("/user", userController.createUser)

/* Listing projectManager Routes */

//get all projectManagers

//get a single projectManager

//exporting router
module.exports = router;
