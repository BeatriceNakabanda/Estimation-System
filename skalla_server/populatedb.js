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
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
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
estimateRequestDetail = { 
    project: project,
    developer: developer,
    title: title,
    projectManager: projectManager,
    dueDate: dueDate,
    taskDescription: taskDescription,
    status: status
}

if (dueDate != false) estimateRequestDetail.dueDate = dueDate
if (status != false) estimateRequestDetail.status = status
    
const estimateRequest = new EstimateRequest(estimateRequestDetail);    
estimateRequest.save(function (err) {
    if (err) {
    cb(err, null)
    return
    }
    console.log('New Estimate Request: ' + estimateRequest);
    estimateRequests.push(estimateRequest)
    cb(null, estimateRequest)
}  );
}

function estimateCreate(submittedDate, developer, totalSum, lineItem, cb) {
estimateDetail = { 
    submittedDate: submittedDate,
    developer: developer,
    totalSum: totalSum,
    lineItem: lineItem
}    
if (lineItem != false) estimateDetail.lineItem = lineItem
    
const estimate = new Estimate(estimateDetail);    
estimate.save(function (err) {
    if (err) {
    console.log('ERROR CREATING Estimate: ' + estimate);
    cb(err, null)
    return
    }
    console.log('New Estimate: ' + estimate);
    estimates.push(estimate)
    cb(null, estimate)
}  );
}

function createProjectsDevelopers(cb) {
    async.parallel([
        function(callback) {
          developerCreate('Beatrice', 'beats321', 'beats@gmail.com', 'developer', callback);
        },
        function(callback) {
          developerCreate('Ronnie', 'ronnie321', 'ronnie@gmail.com', 'developer', callback);
        },
        function(callback) {
          developerCreate('Odong', 'odong321', 'odong@gmail.com', 'developer', callback);
        },
        function(callback) {
          developerCreate('Benjamin', 'ben321', 'benjamin@gmail.com', 'developer', callback);
        },
        function(callback) {
          developerCreate('Olive', 'olee321', 'olive@gmail.com', 'developer', callback);
        },
        function(callback) {
          projectCreate("Refactory", callback);
        },
        function(callback) {
          projectCreate("Xente", callback);
        },
        function(callback) {
          projectCreate("Imuka Access", callback);
        },
        function(callback) {
            projectCreate("Elisha Rooms", callback);
        },
        function(callback) {
            projectCreate("Stanbic", callback);
        },
        ],
        // optional callback
        cb);
}

function createProjectManagers(cb) {
    async.parallel([
        function(callback) {
          projectManagerCreate('Cindy', 'cindy123', 'cindy@gmail.com', 'project manager', callback);
        },
        function(callback) {
          projectManagerCreate('Roy', 'roy123', 'roy@gmail.com', 'project manager', callback);
        },
        function(callback) {
          projectManagerCreate('Joanitah', 'joanitah123', 'joanitah@gmail.com', 'project manager', callback);
        },
        function(callback) {
          projectManagerCreate('Lillian', 'lillian123', 'lillian@gmail.com', 'project manager', callback);
        },
        function(callback) {
          projectManagerCreate('Micheal', 'micheal123', 'micheal@gmail.com', 'project manager', callback);
        },
        ],
        // optional callback
        cb);
}

function createEstimateRequests(cb) {
    async.parallel([
        function(callback) {
          estimateRequestCreate([projects[0],], developers[0], 'Navigation', projectManagers[0], '2020-01-15', 'Let us add a navigation bar.', 'Created', callback);
        },
        function(callback) {
            estimateRequestCreate([projects[1],], developers[1], 'Dashboard', projectManagers[0], '2020-01-10', 'Let us add a dashboard.', 'Created', callback);
        },
        function(callback) {
            estimateRequestCreate([projects[2],], developers[2], 'Deals', projectManagers[0], '2020-01-16', 'Let us add deals.', 'Created', callback);
        },
        function(callback) {
            estimateRequestCreate([projects[3],], developers[3], 'Categories', projectManagers[0], '2020-01-18', 'Let us add categories.', 'Created', callback);
        },
        function(callback) {
            estimateRequestCreate([projects[4],], developers[4], 'Credit', projectManagers[0], '2020-01-19', 'Let us add a credit section.', 'Created', callback);
        },
        function(callback) {
            estimateRequestCreate([projects[0],], developers[3], 'Main Section', projectManagers[0], '2020-01-15', 'Let us add a main section.', 'Created', callback);
        },
        function(callback) {
            estimateRequestCreate([projects[1],], developers[1], 'Content', projectManagers[0], '2020-01-15', 'Let us add some dummy content.', 'Created', callback);
          }
        ],
        // optional callback
        cb);
}

function createEstimates(cb) {
    async.parallel([
        function(callback) {
          estimateCreate('2020-01-10', developers[0], 16.00, ['description: 2.00', 'research: 2.00', 'planning: 2.00', 'development: 2.00', 'testing: 2.00', 'stabilization: 2.00', 'certainty: 75', 'sum: 12.00', 'adjustedSum: 14.00', false], callback)
        },
        function(callback) {
            estimateCreate('2020-01-11', developers[1], 16.00, ['description: 2.00', 'research: 2.00', 'planning: 2.00', 'development: 2.00', 'testing: 2.00', 'stabilization: 2.00', 'certainty: 75', 'sum: 12.00', 'adjustedSum: 14.00', false], callback)
        },
        function(callback) {
            estimateCreate('2020-01-12', developers[2], 16.00, ['description: 2.00', 'research: 2.00', 'planning: 2.00', 'development: 2.00', 'testing: 2.00', 'stabilization: 2.00', 'certainty: 75', 'sum: 12.00', 'adjustedSum: 14.00', false], callback)
        },
        function(callback) {
            estimateCreate('2020-01-13', developers[3], 16.00, ['description: 2.00', 'research: 2.00', 'planning: 2.00', 'development: 2.00', 'testing: 2.00', 'stabilization: 2.00', 'certainty: 75', 'sum: 12.00', 'adjustedSum: 14.00', false], callback)
        }
        ],
        // Optional callback
        cb);
}

async.series([
    createProjectsDevelopers,
    createProjectManagers,
    createEstimateRequests,
    createEstimates
],
// Optional callback
function(err, results) {
    if (err) {
        console.log('FINAL ERR: '+err);
    }
    else {
        console.log('Estimates: '+ estimates);
        
    }
    // All done, disconnect from database
    mongoose.connection.close();
});

//node command to run script for localhost testing
// node populatedb mongodb://localhost:27017/skalla_localhost_app



