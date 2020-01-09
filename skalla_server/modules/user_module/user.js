const User = require("./user_model");
const mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);

exports.singleUser = function(req, res) {
  User.findById({ _id: req.params.userId }, function(next, user) {
    if (next) {
      res.send(next);
    } else {
      res.json(user);
    }
  });
};
