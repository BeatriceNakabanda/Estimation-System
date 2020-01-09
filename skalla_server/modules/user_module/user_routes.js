const express = require("express");
const router = express.Router();
const UserController = require("./userController");
const loginController = require("./loginController");
router.post("/userlogin", (req, res) => loginController.loginUser(req, res));

//router.get("/users", (req, res) => userController.getAllUsers(req, res));
router.get("/users", UserController.getUsers);
router.get("/user/:userId", UserController.singleUser);

module.exports = router;
