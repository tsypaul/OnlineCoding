var express = require('express');
var router = express.Router();
var fs = require('fs-extra');

//POST routes for the filing system
//POST route for creating a new folder
router.post('/project/newFolder',function(req,res){
    var projectId=req.body.id;
    var folder=req.body.folder;
    var path='../Projects/'+ projectId + '/' + folder;
    if(fs.existsSync(path)){
        res.send('folder already exists');
    }else{
        fs.mkdirSync(path);
        res.send('folder created successfully');
    }
});
//POST route for creating a new file
router.post('/project/newFile',function(req,res){
    var fileName = req.body.fileName;
    var projectId = req.body.id;
    var path= '../Projects/'+ projectId + '/' + fileName;
    if(fs.existsSync(path)){
        res.send('file already exists');
    }else{
        fs.openSync(path,'w+');
        res.send('file created successfully');
    }
});
//POST route for deleting a file/folder
router.post('/project/delete', function(req,res){
    var projectId=req.body.id;
    var path=req.body.path;
    fs.removeSync('../Projects/' + projectId + '/' + path);
});

//GET routes for filing system
//GET route to get the contents of a folder inside the project directory
router.get('/project/folder',function(req,res){
    var projectId=req.body.id;
    var folder=req.body.folder;
    //folder is the folder path inside the project
    var contents=fs.readdirSync('../Projects/'+ projectId + '/' + folder);
    res.send(contents);
});
//GET route for reading a file
router.post('/project/file',function(req,res){
   var file=req.body.file;
    //file is the file path inside the project
    var id=req.body.id;
    var path='../Projects/'+id+'/'+file;
    //var obj=fs.outputFileSync('../Projects/'+id+'/'+file,'hello');
    //var object=fs.readFileSync('../Projects/'+id+'/'+file,'utf8');
    //console.log(object);
    res.sendFile(path);

})

module.exports = router;