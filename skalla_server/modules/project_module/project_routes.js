//requiring dependecies
const express = require("express")
const router = express.Router();  //express router for routing
const projectController = require('./project_contollers')

//get all projects
router.get("/projects", projectController.projectList)

//create project
router.post("/project", projectController.createProject)

module.exports = router

