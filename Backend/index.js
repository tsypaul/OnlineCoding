var express = require('express');
var app = express();
var mongoose= require('mongoose');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');
var fs = require('fs');
var http = require('http')
var server = http.createServer(app);
var io = require('socket.io')(server);

io.origins('http://localhost:8080');

app.use((req, res)=>{
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
})

//listen to port 3000
app.set('port', process.env.port || 3000);

//init
server.listen(app.get('port'), (err, res) =>{
  console.log('Server started at port', app.get('port'))
})

//connect to MongoDB
var db = mongoose.connect('mongodb://localhost:27017/OnlineCodingProject', function(err,response){
  if(err) {console.log('There is error connecting with mongo db');}
  else{console.log('Connection with mongo db successful');}
});
mongoose.Promise = global.Promise;

// parse incoming requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

//use sessions for tracking logins
app.use(session({ 
  secret: 'OnlineCoding', 
  name:'OnlineCodeEditor',
  cookie: {  }, 
  resave: false, 
  saveUninitialized: false, 
}));


// include routes
var auth=require('./routes/auth');
app.use('/', auth);
// include models
User=require('./models/User');
Project=require('./models/Project');
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


app.post('/NewProject',(req,res)=>{
  var projectName=req.body.projectName;
  var projectPath=req.body.projectPath;

  var project = new Project();
  project.projectName=projectName;
  project.projectPath=projectPath;
  project.projectAdmin='Admin';

  project.save((err,result)=> {
      if(err){
          console.log('There is an error in adding project to db');
          res.sendStatus(500);
      }else{
      res.sendStatus(200);
      }
  })

})

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


app.post('/code',(req,res)=>{
  console.log(req.body.code);
  const rootDir = "/Users/shaoyutan/Fall2018";
  let filename = req.body.name;
  console.log(rootDir + filename);
  if(fs.existsSync(rootDir + filename)){

  }
  res.send({msg: "done"});
});

