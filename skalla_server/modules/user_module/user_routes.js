const express = require("express");
const router = express.Router();
const loginController = require("./loginController");
router.post("/login", (req, res) => loginController.login(req, res));

module.exports = router;
