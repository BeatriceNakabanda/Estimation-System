const express = require("express");
const router = express.Router(); //express router for routing
//const passport = require('passport');
const passport = require("../../config/passport");

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/api/project",
    failureRedirect: "/login",
    failureFlash: true
  })
);
