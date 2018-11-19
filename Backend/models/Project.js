var mongoose = require('mongoose');

var ProjectSchema = new mongoose.Schema({
    projectName: {type:String, required:true},
    projectPath: {type:String, required:true},
    projectAdmin: {type:String, required:false}
});


var Project = mongoose.model('Project', ProjectSchema);
module.exports = Project;