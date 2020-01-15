const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = require("./user_model");

class loginController {
  constructor() {}

  //function for login user
  async loginUser(req, res) {
    const userData = req.body;
    User.findOne(
      { email: userData.email, password: userData.password },
      async (error, user) => {
        // In case of error with Mongo
        if (error) {
          console.log(error);
          res.status(500).send({
            status: "Error retrieving details from the database"
          });
          // No errror occured
        } else {
          // No user found with that email
          if (!user) {
            res.status(401).send({ status: "Invalid Email or Password" });

            // User found but the passwords do not match
          } else {
            // For successfull login
            const payload = {
              subject: user.id,
              role: user.role,
              name: user.email
            };
            const token = jwt.sign(payload, "secretKey");
            res.status(200).send({
              token,
              id: user._id,
              email: user.email,
              name: user.name,
              role: user.role,
              status: "successful login"
            });
          }
        }
      }
    );
  }
  //checking for the token match
  CheckToken(req, res, next) {
    if (!req.headers.authorization) {
      return res.status(401).send({
        status: "Unauthorized request"
      });
    }
    const token = req.headers.authorization.split(" ")[1];
    if (token == null) {
      return res.status(401).send({
        status: "Unauthorized request"
      });
    }

    try {
      const payload = jwt.verify(token, "secretKey");
      // Add user Id as a property
      req.body.userId = payload.subject;
      req.body.userRole = payload.role;
    } catch (error) {
      return res.status(401).send({
        status: "The provided token is incorrect"
      });
    }

    next();
  }
}

module.exports = new loginController();
