#! /usr/bin/env node

console.log('This script populates some developers, projectManagers, estimateRequests, estimates and projects to the database. Specify database as argument - e.g.: populatedb mongodb://your_username:your_password@your_dabase_url');

// Get arguments passed on command line
const userArgs = process.argv.slice(2);
if (!userArgs[0].startsWith('mongodb://')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}

//requiring all models
const async = require('async')
const Developer = require('./modules/developer_module/developer_model')
const ProjectManager = require('./modules/projectManager_module/projectManager_model')
const EstimateRequest = require('./modules/estimateRequest_module/estimateRequest_model')
const Estimate = require('./modules/estimate_module/estimate_model')
const Project = require('./modules/project_module/project_model')

const mongoose = require('mongoose');
const mongoDB = userArgs[0];
mongoose.connect(mongoDB);
const db = mongoose.connection;
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

const developers = []
const projectManagers = []
const projects = []
const estimateRequests = []
const estimates = []

function developerCreate(name, password, email, role, cb) {
    //object for developer details
    developerDetail = {name:name , password: password, email: email, role:role }    
    
    const developer = new Developer(developerDetail);
         
    developer.save(function (err) {
      if (err) {
        cb(err, null)
        return
      }
      console.log('New Developer: ' + developer);
      developers.push(developer)
      cb(null, developer)
    }  );
  }

  function projectManagerCreate(name, password, email, role, cb) {
    //object for projectManager details
    projectManagerDetail = {name:name , password: password, email: email, role:role }    
    
    const projectManager = new ProjectManager(projectManagerDetail);
         
    projectManager.save(function (err) {
      if (err) {
        cb(err, null)
        return
      }
      console.log('New Project Manager: ' + projectManager);
      projectManagers.push(projectManager)
      cb(null, projectManager)
    }  );
  }

  function projectCreate(name, cb) {
    var project = new Project({ name: name });
         
    project.save(function (err) {
      if (err) {
        cb(err, null);
        return;
      }
      console.log('New Project: ' + project);
      projects.push(project)
      cb(null, project);
    }   );
  }

  function estimateRequestCreate(project, developer, title, projectManager, dueDate, taskDescription, status, cb) {
    bookdetail = { 
      title: title,
      summary: summary,
      author: author,
      isbn: isbn
    }
    if (genre != false) bookdetail.genre = genre
      
    var book = new Book(bookdetail);    
    book.save(function (err) {
      if (err) {
        cb(err, null)
        return
      }
      console.log('New Book: ' + book);
      books.push(book)
      cb(null, book)
    }  );
  }

