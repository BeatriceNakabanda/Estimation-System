const express = require('express');
const router = express.Router();   //express router for routing
const request = require('../models/estimateRequest_model') //estimateRequest_model

//get request from the db
router.get('/estimate', (req, res) => {
    request.find({}).then(function(request){
        res.send(request);
    });
});

//post request to the db
router.post('/estimate', (req, res, next) => {
    //sending request to the db
    request.create(req.body).then(function(estimate){
        res.send(estimate);
    }).catch(next);
});

//put request in the db
router.put('/estimate/:id', (req, res) => {
    request.findByIdAndRemove({_id: req.params.id}, req.body).then(function(){
        //find updated request from the db
        request.findOne({_id: req.params.id}).then(function(request){
            res.send(request);
        });
        
    });
});

//delete request from the db
router.delete('/estimate/:id', (req, res) => {
    request.findByIdAndRemove({_id: req.params.id}).then(function(request){
        res.send(request);
    });
});

//exporting router 
module.exports = router;