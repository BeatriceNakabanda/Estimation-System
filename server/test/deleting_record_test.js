/* eslint-disable no-undef */
//requiring dependencies
const assert = require('chai').assert

//request model
const request = require('../models/estimateRequest_model')

//describing tests
describe('Deleting records', function(){
    //declaring global variable
    var start;
    
    beforeEach(function(done){
            start = new request ({
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
        });
        done();
    });
    
    //tests
    it('Deletes one record from the database', function(done){
       request.findOneAndRemove({title: 'Dashboard'}).then(function(){
            request.findOne({title: 'Dashboard'}).then(function(result){
                assert(result === null)
            });
       });
       done();
    });
});