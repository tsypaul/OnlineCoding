var express = require('express');
var mongoose= require('mongoose');
const session = require("express-session");
var bodyParser = require('body-parser');
var path = require('path');
var cors = require('cors');
var http = require('http');
var fs = require('fs');


//init
var app = express();
//app.use('/', express.static('../frontend/build'));
var server = http.createServer(app);
var io = require('socket.io').listen(3000, {
  pingTimeout: 60000,
});
// io.origins('*:*');
//connect to MongoDB
var db = mongoose.connect('mongodb://localhost:27017/OnlineCodingProject', {useNewUrlParser: true}, function(err,response){
  if(err){
    console.log('There is error connecting with mongodb');
  }else{
    console.log('Connection with mongodb successful');
  } 
});
mongoose.Promise = global.Promise;

// parse incoming requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
var corsOptions = {
  origin: 'http://localhost:8080',
  credentials: true };
app.use(cors(corsOptions));
app.use(express.static(path.join(__dirname, 'public')));

//use sessions for tracking logins
app.use(session({ 
  secret: 'OnlineCoding', 
  name:'OnlineCodeEditor',
  cookie: {  }, 
  resave: false, 
  saveUninitialized: false, 
}));


io.on('connection', (socket)=>{
  console.log("A user connected");
  socket.on('code change', (code)=>{
    console.log(code);
    io.sockets.emit('code change', code);
  })
  socket.on('disconnect', ()=>{
    console.log("A user disconnected");
  })
})

// include routes
var auth=require('./routes/auth');
app.use('/', auth);
var project=require('./routes/project');
app.use('/', project);
var file=require('./routes/file');
app.use('/', file);
// include models
User=require('./models/User');
Project=require('./models/Project');
Member=require('./models/Member');
 // catch 404 and forward to error handler
app.use(function(req, res, next ){
  var err = new Error('File Not Found');
  err.status = 404;
  next();
});

// error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.status(500).json( {
    message: err.message,
    error: {}
  });
});

//listen to port 4000
app.set('port', process.env.port || 4000);
app.listen(app.get('port'), function(err,response){
    console.log('server is running on port', app.get('port'))
});

app.post('/loadFiles', (req, res)=>{
  let name = './../Projects/'+req.body.projectName;
  let filesObj = {};
  filesObj[name] = {
    path: name,
    type: 'folder',
    isRoot: true,
    children: fs.readdirSync(name)
  }
  
  filesObj = traverseDir(name, filesObj);
  console.log(filesObj);
})

traverseDir = (name, filesObj) =>{
  const files = {};
  fs.readdirSync(name).forEach(file => {
    let fullPath = path.join(name, file);
    if (fs.lstatSync(fullPath).isDirectory()) {
       console.log(fullPath);
       files[fullPath]={
        path: fullPath,
        type: 'folder',
        children: fs.readdirSync(fullPath)
      }
       traverseDir(fullPath);
     } else {
       console.log(fullPath);
       files[fullPath]={
        path: fullPath,
        type: 'file',
        children: []
      }
     }  
  });
  return files;
}