//requiring dependencies
const Project = require("../models/projects_model");

//get all projects
exports.projectList = function(req, res, next){
    Project.find({}, function (project){
      if(next){
        res.send(next);
      }else{
        res.json(project);
      }
    });
  };

//create project
exports.createProject = function(req, res, next){
    const newProject = new Project (req.body);
    newProject.save(function(project){
      if(next){
        res.send(next);
      }else{
        res.json(project);
      }
    });
  };