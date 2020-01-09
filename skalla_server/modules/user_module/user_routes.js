const express = require("express");
const router = express.Router();
const userController = require("./userController");
const singleUser = require("./user");
router.post("/userlogin", (req, res) => userController.loginUser(req, res));

router.get("/users", (req, res) => userController.getAllUsers(req, res));

router.get("/user/:userId", singleUser.singleUser);

module.exports = router;
