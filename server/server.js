const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");

const cors = require("cors");


const app = express();
//middlewares
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

app.use(bodyParser.json());

app.use(cors());

// Database connection
const db = require("./config/uri").mongoURI;
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => {
    console.log(`Database connection is ${db}`);
  })
  .catch(err => {
    console.log(`error ${err}`);
  });
//localhost
const users = require("./routes/api/user");
app.use("/api/user", users);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Served ${PORT}`);
});



