var express = require('express');
var app = express();
const path = require('path');
const port = 5000;

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var url ='mongodb://localhost:27017/onlinecoding';

var authenticated = false;

MongoClient.connect(url, (err, db)=>{
    assert.equal(null, err);
    console.log("Connected to server");
    db.close();
})


app.get('/', (req, res)=>{
    if(authenticated){
        res.sendFile(path.join(__dirname + '/index.html'));
    }else{
        res.sendFile(path.join(__dirname + '/login.html'));
    }
});

app.get('/signup', (req, res)=>{
    res.sendFile(path.join(__dirname + '/signup.html'));
});

app.post('/add', (req, res)=>{
    let username = req.body.username;
    let password = req.body.password;
    console.log(username + " " + password);
})

app.listen(port, ()=>{
    console.log('Server started on port ' + port);
});

