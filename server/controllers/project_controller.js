//requiring dependencies
const Project = require("../models/projects_model");

//get all projects
exports.projectList = function(req, res){
    Project.find({}, function (project, err){
      if(err){
        res.send(err);
      }else{
        res.json(project);
      }
    });
  };

//create project
exports.createProject = function(req, res){
    const newProject = new Project (req.body);
    newProject.save(function(project, err){
      if(err){
        res.send(err);
      }else{
        res.json(project);
      }
    });
  };