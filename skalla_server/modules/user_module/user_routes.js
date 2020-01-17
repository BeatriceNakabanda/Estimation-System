//requiring dependecies
const express = require("express");
const router = express.Router();
const userController = require("./userController");

const loginController = require("../user_module/loginController");
//All users routes
router.post("/user/userlogin", loginController.loginUser);

//get all users
router.get("/users", userController.usersList);

//get all projectManagers
router.get(
  "/users/project-managers",
  loginController.CheckToken,
  userController.projectManagersList
);

//get all developers
router.get(
  "/users/developers",
  loginController.CheckToken,
  userController.developersList
);

//get a single developer
router.get(
  "/users/developer/:requestId",
  loginController.CheckToken,
  userController.singleDeveloperRequest
);

module.exports = router;
