#! /usr/bin/env node

console.log('This script populates some users, estimateRequests, estimates and projects to the database. \n\n Specify database as argument - e.g.: node populatedb mongodb://your_username:your_password@your_dabase_url');

//node command to run script for localhost testing for skalla application
// node populatedb mongodb://localhost:27017/skalla_localhost_app

//node command to run script for localhost testing for skalla application
// node populatedb mongodb://localhost:27017/skalla_localhost_app_version2

//node command to run script for cloud atlas testing for skalla application
// node populatedb mongodb+srv://accessgranted:skalla001@skallacluster-dv66v.mongodb.net/skalla?retryWrites=true&w=majority

// add 'mongodb+srv://' => in order to populate cloud atlas mongodb database

// Get arguments passed on command line
const userArgs = process.argv.slice(2);
if (!userArgs[0].startsWith('mongodb+srv://')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}

//requiring all models
const async = require('async')
const User = require('./modules/user_module/user_model')
const EstimateRequest = require('./modules/estimateRequest_module/estimateRequest_model')
const Estimate = require('./modules/estimate_module/estimate_model')
const Project = require('./modules/project_module/project_model')

//database connection
const mongoose = require('mongoose');
const mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

//arrays for models
const users = []
const projects = []
const estimateRequests = []
const estimates = []

//functions for creation of the models
function developerCreate(name, password, email, role, cb) {
    //object for developer details
    developerDetail = {name:name , password: password, email: email, role:role }    
    
    const developer = new User(developerDetail);
         
    developer.save(function (err) {
      if (err) {
        cb(err, null)
        return
      }
      console.log('New Developer: ' + developer);
      users.push(developer)
      cb(null, developer)
    }  );
  }

function projectManagerCreate(name, password, email, role, cb) {
//object for projectManager details
projectManagerDetail = {name: name , password: password, email: email, role:role }    

const projectManager = new User(projectManagerDetail);
        
projectManager.save(function (err) {
    if (err) {
    cb(err, null)
    return
    }
    console.log('New Project Manager: ' + projectManager);
    users.push(projectManager)
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


function estimateRequestCreate(project, developerCreate, title, projectManagerCreate, dueDate, taskDescription, status, cb) {

  estimateRequestDetail = {
    project: project,
    developer: developerCreate,
    title: title,
    projectManager: projectManagerCreate,
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
    }else
    console.log('New Estimate Request: ' + estimateRequest);
    estimateRequests.push(estimateRequest)
    cb(null, estimateRequest)
}  );
}

function estimateCreate(submittedDate, user, totalSum, lineItem, cb) {
estimateDetail = {
  submittedDate: submittedDate,
  developer: user,
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
    cb (null, estimate)
}  );
}

//creating model instances 
function createProjectsDevelopers(cb) {
    async.parallel([
        function(callback) {
          developerCreate('Beatrice', 'beats321', 'beats@gmail.com', 'Developer', callback);
        },
        function(callback) {
          developerCreate('Ronnie', 'ronnie321', 'ronnie@gmail.com', 'Developer', callback);
        },
        function(callback) {
          developerCreate('Odong', 'odong321', 'odong@gmail.com', 'Developer', callback);
        },
        function(callback) {
          developerCreate('Benjamin', 'ben321', 'benjamin@gmail.com', 'Developer', callback);
        },
        function(callback) {
          developerCreate('Olive', 'olee321', 'olive@gmail.com', 'Developer', callback);
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
          projectManagerCreate('Cindy', 'cindy123', 'cindy@gmail.com', 'Project Manager', callback);
        },
        function(callback) {
          projectManagerCreate('Roy', 'roy123', 'roy@gmail.com', 'Project Manager', callback);
        },
        function(callback) {
          projectManagerCreate('Joanitah', 'joanitah123', 'joanitah@gmail.com', 'Project Manager', callback);
        },
        function(callback) {
          projectManagerCreate('Lillian', 'lillian123', 'lillian@gmail.com', 'Project Manager', callback);
        },
        function(callback) {
          projectManagerCreate('Micheal', 'micheal123', 'micheal@gmail.com', 'Project Manager', callback);
        },
        ],
        // optional callback
        cb);
}

function createEstimateRequests(cb) {
    async.parallel([
        function(callback) {
          estimateRequestCreate(projects[0], users[0], 'Navigation', users[5], '2020-01-15', 'Let us add a navigation bar.', 'Submitted', callback);
        },
        function(callback) {
            estimateRequestCreate(projects[1], users[1], 'Dashboard', users[6], '2020-01-10', 'Let us add a dashboard.', 'Submitted', callback);
        },
        function(callback) {
            estimateRequestCreate(projects[2], users[2], 'Deals', users[7], '2020-01-16', 'Let us add deals.', 'Estimated', callback);
        },
        function(callback) {
            estimateRequestCreate(projects[3], users[3], 'Categories', users[8], '2020-01-18', 'Let us add categories.', 'Draft', callback);
        },
        function(callback) {
            estimateRequestCreate(projects[4], users[4], 'Credit', users[9], '2020-01-19', 'Let us add a credit section.', 'Draft', callback);
        },
        function(callback) {
            estimateRequestCreate(projects[0], users[0], 'Main Section', users[10], '2020-01-15', 'Let us add a main section.', 'Submitted', callback);
        },
        function(callback) {
            estimateRequestCreate(projects[1], users[1], 'Content', users[11], '2020-01-15', 'Let us add some dummy content.', 'Draft', callback);
          }
        ],
        // optional callback
        cb);
}

function createEstimates(cb) {
    async.parallel([
        function(callback) {
          estimateCreate('2020-01-10', users[0], '16.00', [{description: '2.00'}, {research: '2.00'}, {planning: '2.00'}, {development: '2.00'}, {testing: '2.00'}, {stabilization: '2.00'}, {certainty: '75'}, {sum: '12.00'}, {adjustedSum: '14.00'}, {comments: ''}], estimateRequests[0], callback)
        },
        function(callback) {
            estimateCreate('2020-01-11', users[1], '16.00', [{description: '2.00'}, {research: '2.00'}, {planning: '2.00'}, {development: '2.00'}, {testing: '2.00'}, {stabilization: '2.00'}, {certainty: '75'}, {sum: '12.00'}, {adjustedSum: '14.00'}, {comments: ''}], callback)
        },
        function(callback) {
            estimateCreate('2020-01-12', users[2], '16.00', [{description: '2.00'}, {research: '2.00'}, {planning: '2.00'}, {development: '2.00'}, {testing: '2.00'}, {stabilization: '2.00'}, {certainty: '75'}, {sum: '12.00'}, {adjustedSum: '14.00'}, {comments: 'Will be accomplished earlier than estimated.'}], callback)
        },
        function(callback) {
            estimateCreate('2020-01-13', users[3], 16.00, [{description: '2.00'}, {research: '2.00'}, {planning: '2.00'}, {development: '2.00'}, {testing: '2.00'}, {stabilization: '2.00'}, {certainty: '75'}, {sum: '12.00'}, {adjustedSum: '14.00'}, {comments: 'Will be accomplished earlier than estimated.'}], callback)
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





