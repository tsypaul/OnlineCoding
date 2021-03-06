var express = require('express');
var router = express.Router();
var User = require('../models/User');
var Project = require('../models/Project');
var Member = require('../models/Member');
var fs = require('fs-extra');
var ObjectID = require('mongodb').ObjectID;
var walk=require('walk-sync');
var moment=require('moment')

//POST route for creating a new project
router.post('/createProject',function (req, res) {
    User.findById(req.session.userId,function(err,user){
        //Check if user is logged in
        if(err){
            res.send('Server error');
        }else{
            const projectName=req.body.projectName;
            var projectData = {
                projectName: projectName,
                projectAdmin: user.username
            }
            //console.log(projectName)
            if(!projectName){
                res.send('Enter a project name first')
            }else{
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
        }
    });
});

//POST routes for Project Management
//POST route for deleting a project
router.post('/deleteProject',function (req, res) {
    User.findById(req.session.userId,function(err,user){
        if(err){
            res.send('Server error');
        }else{
            const projectId = req.body.id;
            id = new ObjectID(projectId);
            Project.findById(id,function(err,project){
                //console.log(project)
                if(err){
                    res.send('Server error');
                }else if(user.username!=project.projectAdmin){
                    res.send('User is not admin');
                }else{
                    Project.findByIdAndDelete(id,function(err){
                        if(err){
                            res.send('Server error');
                        }else{
                            Member.deleteMany({project: id},function(err){
                                if(err){
                                    res.send('Server error');
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

//POST route for renaming a project
router.post('/renameProject',function (req, res) {
    const projectId=req.body.id;
    const projectName=req.body.name;

    id=new ObjectID(projectId)
    User.findById(req.session.userId,function(err,user){
        if(err){
            res.send('Server error');
        }else{
            if(projectName===''){
                res.send('Enter a project name first')
            }else{
                Project.findById(id,function(err,project){
                    if(err){
                        res.send('Server error');
                    }else if(user.username==project.projectAdmin){
                        Project.findById(id,function(err,pro){
                            if(err){
                                res.send('Server error');
                            }else{
                                pro.projectName=projectName;
                                pro.save();
                                Member.updateMany({project:id},{projectName:projectName},function(err){
                                    if(err){
                                        res.send('Server error');
                                    }else{
                                        res.send('Project name was successfully changed');
                                    }
                                });
                            }
                        });
                    }else{
                        res.send('Only the current admin can rename the project');
                    }
                });
            }
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
            res.send('Server error');
        }else{
            Project.findById(id,function(err,project){
                if(err){
                    res.send('Server error');
                }else if(user.username==project.projectAdmin){
                    User.find({username:username},function(err,user){
                        if(err){
                            res.send('Server error');
                        }else if(user.length===1){
                            var memberData = {
                                project: id,
                                projectName: project.projectName,
                                member: username
                            }
                            Member.find(memberData,function(err,member){
                                if(err) {
                                    res.send('Server error');
                                }else if(member.length===0){
                                    Member.create(memberData);
                                    res.send('Member added successfully');
                                }else{
                                    res.send('User is already a member');
                                }
                            });
                        }else{
                            res.send('User not found')
                        }
                    })
                }else{
                    res.send('Only '+project.projectAdmin+' can add members to the project');
                }
            });
        }
    });
});

//POST route for leaving a project
router.post('/leaveProject',function(req,res){
    const projectId = req.body.id;
    id=new ObjectID(projectId)
    User.findById(req.session.userId,function(err,user){
        if(err){
            res.send('Server error');
        }else{
            Project.findById(id,function(err,project){
                if(err){
                    res.send('Server error');
                }else if(user.username==project.projectAdmin){
                    res.send('Change Admin before leaving the project');
                }else{
                    Member.findOneAndDelete({project: id, member: user.username},function(err,member){
                        if(err){
                            res.send('Server error');
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
            res.send('Server error');
        }else{
            Project.findById(id,function(err,project){
                if(err){
                    res.send('Server error');
                }else if(user.username==project.projectAdmin){
                    Member.findOneAndDelete({project: id, member: username},function(err){
                        if(err){
                            res.send('Server error');
                        }else{
                            res.send('Member was successfully removed from the project');
                        }
                    });
                }else{
                    res.send('Only '+project.projectAdmin+' can remove members from the project');
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
            res.send('Server error');
        }else{
            Project.findById(id,function(err,project){
                if(err){
                    res.send('Server error');
                }else if(user.username==project.projectAdmin){
                    Project.findById(id,function(err,pro){
                        if(err){
                            res.send('Server error');
                        }else{
                            pro.projectAdmin=username;
                            pro.save();
                            res.send('Admin was successfully changed');
                        }
                    });
                }else{
                    res.send('Only '+project.projectAdmin+' can change the admin of the project');
                }
            });
        }
    });
});

//GET routes for project management
//GET route for dashboard to get projects user is a member of
router.get('/dashboard', function(req,res){
    User.findById(req.session.userId,function(err,user){
        if (err || req.session.userId===undefined){
            return res.send('User not logged in');
        }else{
            Member.find({member:user.username},function(err,docs){
                if(err){
                    res.send('not able to obtain data');
                }else{
                    res.send(docs);
                }
            });
        }
    });
});
//GET route to get the members of a project
router.get('/project/members/:id',function(req,res){
    var projectId=req.params.id;
    var id=new ObjectID(projectId);
    Member.find({project:id},function(err,docs){
        if(err){
            res.send('Server Error');
        }else{
            res.send(docs);
        }
    })
});
//GET route to get project folder contents
router.get('/project/contents/:id',function(req,res){
    if(req.session.userId===undefined){
        res.send('User is not logged in');
    }else{
        var projectId=req.params.id;
        User.findById(req.session.userId,function(err,user){
            if(err){
                res.send('Server error');
            }else{
                Member.findOne({member:user.username,project:projectId},function(err,doc){
                    if(err){
                        res.send('Server error');
                    }else if(doc.length===0){
                        res.send('User is not a member')
                    }else{
                        var key= walk('../Projects/'+projectId, { includeBasePath: false,directories: false});
                        var files=[];
                        key.map(function(file,index){
                            var stats = fs.statSync('../Projects/'+projectId+'/'+file);
                            var fileSizeInBytes = stats["size"];
                            var mtime =  +moment().subtract(new Date().getTime()-stats.mtime);
                            files[index]={key:file,modified:mtime,size:fileSizeInBytes}
                        });
                        res.send(files);
                    }
                })
            }
        })
    }

});

module.exports = router;