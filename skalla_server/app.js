//requiring dependencies
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
mongoose.Promise = require("bluebird");

//requiring routes
const projectsRouter = require("./modules/project_module/project_routes");
const estimateRequestRouter = require("./modules/estimateRequest_module/estimateRequest_routes");
const usersRouter = require("./modules/user_module/user_routes");
const estimateRouter = require("./modules/estimate_module/estimate_routes");

//declaring server port
const port = process.env.PORT || 8081;

//Initializing express app
const app = express();

//express app middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//database connection
const mongourl =
  "mongodb+srv://accessgranted:skalla001@skallacluster-dv66v.mongodb.net/skalla?retryWrites=true&w=majority";

mongoose
  .connect(mongourl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Successfully connected to mongodb database"))
  .catch(err => console.log(err));

//app routes
app.get("/", (req, res) => {
  res.send("Welcome to Skalla server");
});
app.use("/api", projectsRouter);
app.use("/api", usersRouter);
app.use("/api", estimateRequestRouter);
app.use("/api", estimateRouter);

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
