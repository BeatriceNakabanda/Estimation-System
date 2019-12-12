//requiring dependencies
const Project = require("./projects_model");

//get all projects
exports.projectList = function(req, res){
    Project.find({}, function (project, next){
      if(next){
        res.send(next);
      }else{
        res.json(project);
      }
    });
  };

//create project
exports.createProject = function(req, res){
    const newProject = new Project (req.body);
    newProject.save(function(project, next){
      if(next){
        res.send(next);
      }else{
        res.json(project);
      }
    });
  };