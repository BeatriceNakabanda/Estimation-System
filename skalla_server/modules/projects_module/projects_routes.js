//requiring dependecies
const express = require("express")
const router = express.Router();  //express router for routing
const projectService = require('./projects_contoller')

/* Listing Project Routes */



//get all projects
router.get("/projects", projectService.projectList)

//get single project

//create project
router.post("/project", projectService.createProject)

module.exports = router

