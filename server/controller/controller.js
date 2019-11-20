/* eslint-disable no-undef */
/* eslint-disable no-console */
const express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const Estimates = mongoose.model("estimateRequest");

// CRUD operations
router.get("/estimates", (req, res) => {
  res.render("../src/views/Tables/ListOfEstimatesTable", {
    estimates: req.body
  });
});

router.post("/estimates", (req, res) => {
  if (req.body._id == "") insertdata(req, res);
  else updateInfo(req, res);
});

function insertdata(req, res) {
  var estimate = new Estimates();

  estimate.title = req.body.title;
  estimate.taskDescription = req.body.taskDescription;
  estimate.project = req.body.project;
  estimate.developer = req.body.developer;
  estimate.project = req.body.project;
  estimate.status = req.body.status;
  estimate.createdDate = req.body.createdDate;

  // eslint-disable-next-line no-unused-vars
  estimate.save((err, doc) => {
    if (!err) {
      res.redirect("../client/src/views/Tables/ListOfEstimatesTable");
    } else {
      if (err.name == "ValidationError") handleValidationError(err, req.body);
      res.render("../client/src/views/Tables/ListOfEstimatesTable.vue", {
        estimate: req.body
      });
      //console.log("error" + err);
    }
  });
}
function updateInfo(req, res) {
  Estimates.findByIdAndUpdate(
    { _id: req.body._id },
    req.body,
    { new: true },
    // eslint-disable-next-line no-unused-vars
    (err, doc) => {
      if (!err) {
        res.redirect("/estimates");
      } else {
        if (err.name == "handleValidationError") {
          handleValidationError(err, req.body);
          res.render("../client/src/views/Tables/ListOfEstimatesTable.vue", {
            estimates: req.body
          });
        } else console.log("error" + err);
      }
    }
  );
}
router.get("/estimates", (req, res) => {
  // res.json("fromlist");
  Employee.find((err, docs) => {
    if (!err) {
      res.render("./client/src/views/Tables/ListOfEstimatesTable.vue", {
        estimates: docs
      });
      // console.log(Employee);
    } else {
      console.log("Error" + err);
    }
  });
});

function handleValidationError(err, body) {
  for (field in err.errors) {
    switch (err.errors[field].path) {
      case "title":
        body["titleError"] = err.errors[field].message;
        break;
      case "developer":
        body["developerError"] = err.errors[field].message;
        break;
      case "status":
        body["projectError"] = err.errors[field].message;
        break;
      case "statusType":
        body["statusTypeError"] = err.errors[field].message;
        break;
      case "dueDate":
        body["dueDateError"] = err.errors[field].message;
        break;
      case "taskDescription":
        body["taskDescriptionError"] = err.errors[field].message;
        break;
      default:
        break;
    }
  }
}
router.get("estimates/:id", (req, res) => {
  Employee.findById(req.params.id, (err, doc) => {
    if (!err) {
      res.render("../client/src/views/Tables/ListOfEstimatesTable.vue", {
        estimates: doc
      });
    }
  });
});
router.get("/delete/:id", (req, res) => {
  // eslint-disable-next-line no-unused-vars
  Employee.findByIdAndDelete(req.params.id, (err, doc) => {
    if (!err) {
      res.redirect("../client/src/views/Tables/ListOfEstimatesTable.vue");
    } else {
      console.log("Error" + err);
    }
  });
});
//exporting the router object
module.exports = router;
