var express = require('express');
var router = express.Router();
var User = require('../models/User');
var Project = require('../models/Project');
var Member = require('../models/Member');
var fs = require('fs-extra');
var ObjectID = require('mongodb').ObjectID;

//POST route for creating a new project
router.post('/createProject',function (req, res) {
    User.findById(req.session.userId,function(err,user){
    //Check if user is logged in
    if(err){
        res.status(404).send('Server error');
    }else{
    const {body}=req;
    const {
        projectName
    } = body;
    var projectData = {
        projectName: projectName,
        projectAdmin: user.username
    }
    Project.create(projectData,function(err,project){
        projectId=project._id;
        if(err){
            res.status(404).send('Server error');
        }else{
            //update project path and chat path in db
            project.projectPath = '../Projects/' + projectId;
            var chatPath='../Projects/' + projectId + '/chat.txt';
            project.save()

            //Make directory for the project
            fs.mkdirSync(project.projectPath);
            //Create the chat file
            fs.openSync(chatPath,'w+');

            var memberData = {
                project: projectId,
                projectName: project.projectName,
                member: user.username
            }
            Member.create(memberData);
            res.send('Project was created successfully');
        }
    });
    }
    });
});

//POST routes for Project Management
//POST route for deleting a project
router.post('/deleteProject',function (req, res) {
    User.findById(req.session.userId,function(err,user){
        if(err){
            res.status(404).send('Server error');
        }else{
        const {body}=req;
        const {projectId} = body;
        id = new ObjectID(projectId);
        Project.findById(id,function(err,project){
            if(err){
                res.status(404).send('Server error');
            }else if(user.username!=project.projectAdmin){
                res.status(401).send('User is not admin');
            }else{
            Project.findByIdAndDelete(id,function(err){
                if(err){
                    res.status(404).send('Server error');
                }else{
                    Member.deleteMany({project: id},function(err){
                        if(err){
                            res.status(404).send('Server error');
                        }else{
                             fs.removeSync('../Projects/' + projectId);
                             res.send('Project was removed successfully');
                        }
                    });
                }
            });
        }
        });
        }
    });
});

//POST route for adding members
router.post('/addMember',function(req,res){
    const {body}=req;
    const {
        username,
        projectId

    } = body;
    id=new ObjectID(projectId)
    User.findById(req.session.userId,function(err,user){
        if(err){
            res.status(404).send('Server error');
        }else{
            Project.findById(id,function(err,project){
                if(err){
                    res.status(404).send('Server error');
                }else if(user.username==project.projectAdmin){
                var memberData = {
                    project: id,
                    projectName: project.projectName,
                    member: username
                }
                    Member.create(memberData);
                    res.send('Member added successfully');
                }else{
                    res.status(401).send('Only admin can add members to the project');
                }
             });
        }
    });
});

//POST route for leaving a project
router.post('/leaveProject',function(req,res){
    const {body}=req;
    const {projectId} = body;
    id=new ObjectID(projectId)
    User.findById(req.session.userId,function(err,user){
        if(err){
            res.status(404).send('Server error');
        }else{
            Project.findById(id,function(err,project){
                if(err){
                    res.status(404).send('Server error');
                }else if(user.username==project.projectAdmin){
                    res.status(401).send('Admin can not leave the project');
                }else{
                    Member.findOneAndDelete({project: id, member: user.username},function(err,member){
                        if(err){
                            res.status(404).send('Server error');
                        }else{
                            res.send('Member successfully left the project');
                        }
                    });
                    
                }
            });
        }
    });
});

//POST route for removing members
router.post('/removeMember',function(req,res){
    const {body}=req;
    const {
            projectId,
            username
        } = body;
    id=new ObjectID(projectId)
    User.findById(req.session.userId,function(err,user){
        if(err){
            res.status(404).send('Server error');
        }else{
            Project.findById(id,function(err,project){
                if(err){
                    res.status(404).send('Server error');
                }else if(user.username==project.projectAdmin){
                    Member.findOneAndDelete({project: id, member: username},function(err,member){
                        if(err){
                            res.status(404).send('Server error');
                        }else{
                            res.send('Member was successfully removed from the project');
                        }
                    });
                }else{
                    res.status(401).send('Only admin can remove members from the project');
                }
            });
        }
    });
});

//POST route for changing admin
router.post('/changeAdmin',function(req,res){
    const {body}=req;
    const {
            projectId,
            username
        } = body;
    id=new ObjectID(projectId)
    User.findById(req.session.userId,function(err,user){
        if(err){
            res.status(404).send('Server error');
        }else{
            Project.findById(id,function(err,project){
                if(err){
                    res.status(404).send('Server error');
                }else if(user.username==project.projectAdmin){
                    Project.findById(id,function(err,pro){
                        if(err){
                            res.status(404).send('Server error');
                        }else{
                            pro.projectAdmin=username;
                            pro.save();
                            res.send('Admin was successfully changed');
                        }
                    });
                }else{
                    res.status(401).send('Only the current admin can change the admin of the project');
                }
            });
        }
    });
});

//GET routes for project management
//GET route for dashboard to get projects user is a member of
router.get('/dashboard', function(req,res){
    User.findById(req.session.userId,function(err,user){
        if (err){
            res.status(404).send('Server error');
        }else{
            Member.find({member:user.username},function(err,docs){
                if(err){
                    res.status(404).status('not able to obtain data');
                }else{
                    res.send(docs);
                }
            });
        }
    });
});
//GET route to get the members of a project
router.get('/project/members',function(req,res){
    var projectId=req.body.id;
    var id=new ObjectID(projectId);
    Member.find({project:id},function(err,docs){
        if(err){
            res.status(404).send('Server Error');
        }else{
            res.send(docs);
        }
    })
});
//GET route to get project folder contents
router.get('/project/contents',function(req,res){
    var projectId=req.body.id;
    var contents=fs.readdirSync('../Projects/'+ projectId);
    res.send(contents);
});

module.exports = router;