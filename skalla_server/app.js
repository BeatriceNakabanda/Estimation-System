//requiring dependencies
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy; //local authentication type
const cookieSession = require("cookie-session");
const session = require("express-session");

//requiring app files
const projectsRouter = require("../skalla_server/modules/project_module/project_routes");
const estimateRequestRouter = require("../skalla_server/modules/estimateRequest_module/estimateRequest_routes");

//declaring server port
const port = process.env.PORT || 8081;

//Initializing express app
const app = express();

//express app middleware
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use(bodyParser.json());
app.use(
  cookieSession({
    name: "mysession",
    keys: ["vueauthrandomkey"],
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Express session
// app.use(
//   session({
//     secret: "secret",
//     resave: true,
//     saveUninitialized: true
//   })
// );

//database connection
const mongourl =
  "mongodb+srv://accessgranted:skalla001@skallacluster-dv66v.mongodb.net/skalla?retryWrites=true&w=majority";

//localhost database connection string for development testing purposes
const mongourl_localhost = "mongodb://localhost:27017/skalla_localhost_app";

mongoose
  .connect(mongourl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    console.log("Mongodb successfully connected to localhost mongodb database")
  )
  .catch(err => console.log(err));

//app routes
app.get("/", (req, res) => {
  res.send("Welcome to Skalla server");
});
app.use("/api", projectsRouter);
// app.use("/api", developersRouter);
app.use("/api", estimateRequestRouter);
// app.use("/api", userRouter);

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

//currently logged in user's data

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
