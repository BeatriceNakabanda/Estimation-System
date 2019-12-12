//requiring dependencies
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const projectsRouter = require("../skalla_server/modules/projects_module/projects_routes");
const developersRouter = require("../skalla_server/modules/developers_module/developers_routes");
const estimateRequestRouter = require("../skalla_server/modules/estimateRequests_module/estimateRequests_routes");

const port = process.env.PORT || 8081;

const app = express();

//express app middleware
app.use(cors());
app.use(bodyParser.json());


//database connection
const mongourl =
  "mongodb+srv://accessgranted:skalla001@skallacluster-dv66v.mongodb.net/skalla?retryWrites=true&w=majority";

mongoose
  .connect(mongourl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Mongodb successfully connected"))
  .catch(err => console.log(err));

//app routes
app.get('/', (req, res) => {res.send("Welcome to Skalla server")})
app.use('/api', projectsRouter)
app.use("/api", developersRouter)
app.use('/api', estimateRequestRouter)


//central error handling for errors throughout the express app
app.use((req, res, next) => {
  const error = new Error ('Not found');
  error.status = 404;
  next(error);
});

app.use((error , req, res, next) => {
res.status(error.status || 500);
res.json({
  error : {
  message : error.message
  }
});
next()
}); 

//express app port
app.listen(port, function() {
  console.log(`Server is running on port: ${port}`);
});
