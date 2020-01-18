//requiring dependecies
const express = require("express");
const router = express.Router(); //express router for routing
const projectController = require("./project_contollers");
const loginController = require("../user_module/loginController");

//get all projects
router.get(
  "/projects",
  // loginController.CheckToken,
  projectController.projectList
);

//create project
router.post(
  "/project",
  loginController.CheckToken,
  projectController.createProject
);

module.exports = router;
