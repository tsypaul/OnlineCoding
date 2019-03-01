var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var MemberSchema = new mongoose.Schema({
    project: {type:ObjectId, required:true, unique:false},
    projectName: {type:String, rerquired:true, unique:false},
    member: {type:String, required:true, unique:false}
});

var Member = mongoose.model('Member', MemberSchema);
module.exports = Member;