const express = require("express");
const router = express.Router();
const loginController = require("./loginController");
router.post("/userlogin", (req, res) => userController.loginUser(req, res));

router.get("/users", (req, res) => userController.getAllUsers(req, res));
router.get("/user", (req, res) => userController.getAllUser(req, res));

module.exports = router;
