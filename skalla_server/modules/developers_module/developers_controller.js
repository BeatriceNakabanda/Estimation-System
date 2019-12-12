const Developer = require("./developer_model");

//get all projects
exports.developerList = function(req, res) {
  Developer.find({}, function(developer, next) {
    if (next) {
      res.send(next);
    } else {
      res.json(developer);
    }
  });
};
