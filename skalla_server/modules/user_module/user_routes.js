/* const express = require("express");
const router = express.Router();
const UserController = require("./userController");
const loginController = require("./loginController");
router.post("/userlogin", (req, res) => loginController.loginUser(req, res));

//router.get("/users", (req, res) => userController.getAllUsers(req, res));
router.get("/users", UserController.getUsers);
router.get("/user/:userId", UserController.singleUser);

module.exports = router;
 */

//requiring dependecies
const express = require("express")
const router = express.Router(); 
const userController = require('./userController')

//All user routes
//get all users
router.get("/users", userController.usersList)

//get all projectManagers
router.get("/users/project-managers", userController.projectManagersList)

//get a single projectManager
router.get("/users/project-manager/:requestId", userController.singleProjectManagerRequest)

//get all developers
router.get("/users/developers", userController.developersList)

//get a single developer
router.get("/users/developer/:requestId", userController.singleDeveloperRequest)


module.exports = router