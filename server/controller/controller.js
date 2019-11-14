const express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const Employee = mongoose.model("estimateRequest");
// CRUD operations
router.get("/", (req, res) => {
  res.render("employee/andEdit", {
    viewTitle: "My Information"
  });
});

router.post("/", (req, res) => {
  if (req.body._id == "") insertdata(req, res);
  else updateInfo(req, res);
});

function insertdata(req, res) {
  var employee = new Employee();

  employee.fullName = req.body.fullName;
  employee.email = req.body.email;
  employee.mobile = req.body.mobile;
  employee.city = req.body.city;
  employee.save((err, doc) => {
    if (!err) {
      res.redirect("employee/list");
    } else {
      if (err.name == "ValidationError") handleValidationError(err, req.body);
      res.render("employee/andEdit", {
        viewTitle: "My Information",
        employee: req.body
      });
      //console.log("error" + err);
    }
  });
}
function updateInfo(req, res) {
  Employee.findByIdAndUpdate(
    { _id: req.body._id },
    req.body,
    { new: true },
    (err, doc) => {
      if (!err) {
        res.redirect("employee/list");
      } else {
        if (err.name == "handleValidationError") {
          handleValidationError(err, req.body);
          res.render("employee/andEdit", {
            viewTitle: "My Information",
            employee: req.body
          });
        } else console.log("error" + err);
      }
    }
  );
}
router.get("/list", (req, res) => {
  // res.json("fromlist");
  Employee.find((err, docs) => {
    if (!err) {
      res.render("employee/list", {
        list: docs
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
      case "fullName":
        body["fullNameError"] = err.errors[field].message;
        break;
      case "email":
        body["emailError"] = err.errors[field].message;
        break;
      default:
        break;
    }
  }
}
router.get("/:id", (req, res) => {
  Employee.findById(req.params.id, (err, doc) => {
    if (!err) {
      res.render("employee/andEdit", {
        viewTitle: "Update",
        employee: doc
      });
    }
  });
});
router.get("/delete/:id", (req, res) => {
  Employee.findByIdAndDelete(req.params.id, (err, doc) => {
    if (!err) {
      res.redirect("/employee/list");
    } else {
      console.log("Error" + err);
    }
  });
});
//exporting the router object
module.exports = router;
© 2019 GitHub, Inc.