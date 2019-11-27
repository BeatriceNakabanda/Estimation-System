//requiring dependecies
const express = require("express");
const router = express.Router();  //express router for routing
const estimateRequest_controller = require('../controllers/estimateRequest_controller')
const project_controller = require('../controllers/project_controller')
const developer_controller = require('../controllers/developer_controller')

/* Listing estimate Routes */

//get all estimates
router.get("/estimates", estimateRequest_controller.estimatesList);

//create estimate
router.post("/estimate", estimateRequest_controller.createEstimate);

//get single estimate
router.get("/estimate/:requestId", estimateRequest_controller.singleEstimate);

//update single estimate
router.put("/estimate/:requestId", estimateRequest_controller.updateEstimate);


/* Listing Project Routes */

//get all projects
router.get("/projects", project_controller.projectList);

//create project
router.post("/project", project_controller.createProject);

/* Listing Developer Routes */

//get all developers
// router.get("/developers", developer_controller.developerList);

//get a single developer
// router.get("/developer/:requestId", developer_controller.singleDeveloper);

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
}); */

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
