var mongoose = require('mongoose');

var ProjectSchema = new mongoose.Schema({
    projectName: {
        type:String, 
        required:true, 
        unique:false
    },
    projectAdmin: {
        type:String, 
        required:true, 
        unique:false
    },
    projectPath: {
        type:String, 
        default:null
    }
});


var Project = mongoose.model('Project', ProjectSchema);
module.exports = Project;