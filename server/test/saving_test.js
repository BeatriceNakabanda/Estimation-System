/* eslint-disable no-undef */
//requiring dependencies
const assert = require('chai').assert
const mongoose = require('mongoose');

//requiring request model
const request = require('../models/estimateRequest_model')

//describing tests
describe('Saving records', function(){
    //Drop collection before each test
    beforeEach(function(done){
        //drop the collection
        mongoose.connection.dropCollection(function(){
        });
        done();
      });
    
    //tests
    it('Saves a record to the database', function(done){
        var start = new request ({
            title: 'Dashboard',
            taskDescription: 'Make a navigation bar',
            projectID: [
                {
                    name: 'Xente'
                },
            ],
            developerID: [
                {
                    name: 'Benjamin'
                },
            ],
            projectManagerID: {name: 'David'},
            dueDate: 14-11-2019,
            status: 'Created',
        });

        //checking whether save to database is successfull
        start.save().then(function(){
            //successfull save to database on new creation => false meaning its not new but has been saved to database
            assert(start.isNew === false); 
        }); 
        done();
    });
});