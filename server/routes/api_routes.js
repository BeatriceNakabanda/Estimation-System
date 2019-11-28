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

//get a single user
router.get("/user/:requestId", userController.singleUser)

//create user
router.post("/user", userController.createUser)

/* Listing projectManager Routes */

//get all projectManagers

//get a single projectManager

//get request from the db
/* router.get("/estimate", (req, res) => {
  request.find({}).then(function(request) {
    res.send(request);
  });
}); */

//post request to the db
/* router.post("/estimate", (req, res, next) => {
  //sending request to the db
  request
    .create(req.body)
    .then(function(estimate) {
      res.send(estimate);
    })
    .catch(next);
});  */

//put request in the db
/* router.put("/estimate/:id", (req, res) => {
  request.findByIdAndRemove({ _id: req.params.id }, req.body).then(function() {
    //find updated request from the db
    request.findOne({ _id: req.params.id }).then(function(request) {
      res.send(request);
    });
  });
}); */

//delete request from the db
/* router.delete("/estimate/:id", (req, res) => {
  request.findByIdAndRemove({ _id: req.params.id }).then(function(request) {
    res.send(request);
  });
}); */

//exporting router
module.exports = router;
