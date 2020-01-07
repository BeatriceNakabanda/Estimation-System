const ProjectManager = require("./projectManager_model");

//get all projectManagers
exports.projectManagerList = function(req, res, next){

    ProjectManager.find({})
    .exec(function (err, projectManager){
        if(err){
            return next(err)
        }else{
            res.json(projectManager)
        }
    })
}