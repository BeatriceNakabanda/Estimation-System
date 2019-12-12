//requiring dependencies
const EstimateRequest = require("./estimateRequests_model")
const mongoose = require("mongoose")
mongoose.set('useFindAndModify', false)

//getting all projects
exports.EstimateRequestList = function(req, res){
    EstimateRequest.find({}, function (next, estimateRequest){
        if(next){
            res.send(next)
        }else{
            res.json(estimateRequest)
        }
    })
}

//create estimate request
exports.createEstimateRequest = function(req, res){
    const newEstimateRequest = new request(req.body);
    newEstimateRequest.save(function(next, estimateRequest){
        if(next){
            res.send(next)
        }else{
            res.json(estimate);
        }
    })
}

//get single estimate request
exports.singleEstimateRequest = function(req, res){
    EstimateRequest.findById({_id: req.params.requestId}, function(next, estimateRequest){
        if(next){
            res.send(next)
        }else{
            res.json(estimateRequest)
        }
    })
}
//update single estimate request
exports.updateEstimateRequest = function(req, res){
    EstimateRequest.findByIdAndUpdate({_id: req.params.requestId}, req.body, function(next, estimateRequest){
        if(EstimateRequest !== null ){
            res.json(EstimateRequest)
        }else{
            res.send(next)
        }
    })
}