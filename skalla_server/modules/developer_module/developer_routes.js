//requiring dependecies
const express = require("express");
const router = express.Router(); //express router for routing
const developerService = require("./developer_controllers");

/* Listing developer Routes */

//get all developers
router.get("/developers", developerService.developerList);

// router.post("/developer", projectService.updateDeveloper);

module.exports = router;
