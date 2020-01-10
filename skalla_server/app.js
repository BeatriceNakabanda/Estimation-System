//requiring dependencies
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");

//requiring app files
const projectsRouter = require('./modules/project_module/project_routes');
const estimateRequestRouter = require('./modules/estimateRequest_module/estimateRequest_routes');
const usersRouter = require('./modules/user_module/user_routes');

//declaring server port
const port = process.env.PORT || 8081;

//Initializing express app
const app = express();

require('./modules/auth/auth')

//express app middleware
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(passport.initialize());

//database connection
const mongourl =
  "mongodb+srv://accessgranted:skalla001@skallacluster-dv66v.mongodb.net/skalla?retryWrites=true&w=majority";

//localhost database connection string for development testing purposes
const mongourl_localhost = "mongodb://localhost:27017/skalla_localhost_app";

mongoose
  .connect(mongourl_localhost, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    console.log("Mongodb successfully connected to localhost mongodb database")
  )
  .catch(err => console.log(err));

//app routes
app.get("/", (req, res) => {
  res.send("Welcome to Skalla server");
});
app.use("/api", projectsRouter);
app.use("/api", usersRouter);
app.use("/api", estimateRequestRouter);

//user log in
app.post("/api/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.status(400).send([user, "Cannot log in", info]);
    }

    req.login(user, err => {
      res.send("Logged in");
    });
  })(req, res, next);
});

//user log out
app.get("/api/logout", function(req, res) {
  req.logout();

  console.log("logged out");

  return res.send();
});



//central error handling for errors throughout the express app
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
  next();
});

//express app port
app.listen(port, function() {
  console.log(`Server is running on port: ${port}`);
});
