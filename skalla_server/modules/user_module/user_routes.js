const express = require("express");
const router = express.Router();
const userController = require("./userController");
router.post("/userlogin", (req, res) => userController.loginUser(req, res));

router.get("/users", (req, res) => userController.getAllUsers(req, res));
router.get("/user/:id", (req, res) => userController.getUser(req, res));

module.exports = router;
