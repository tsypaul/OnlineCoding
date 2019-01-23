var express = require('express');
var router = express.Router();
var User = require('../models/User');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser());

 //POST route for register
router.post('/register', function (req, res, next) {
  // confirm that user typed same password twice
  if (req.body.password !== req.body.passwordConf) {
    var err = new Error('Passwords do not match.');
    err.status = 400;
    return next(err);
  }
   if (req.body.username &&
      req.body.password &&
      req.body.passwordConf) {
 
     var userData = {
       username: req.body.username,
       password: req.body.password
     }
 
     //use schema.create to insert data into the db
     User.create(userData, function (err, user) {
       if (err) {
         return next(err)
       } else {
        req.session.userId = user._id;
        return res.redirect('/profile');
       }
      });
    } else {
    var err = new Error('All fields have to be filled out');
    err.status = 400;
    return next(err);
  }
});

//POST route for login
router.post('/login', function (req, res, next) {
  // confirm that user typed same password twice
  if (req.body.username && req.body.password) {
  User.authenticate(req.body.username, req.body.password, function (error, user) {
    if (error || !user) {
      var err = new Error('Wrong username or password.');
      err.status = 401;
      return next(err);
    } else {
      req.session.userId = user._id;
      return res.redirect('/profile');
    }
    });
  }else{
    var err = new Error('Username and password are required.');
    err.status = 401;
  }
});

// GET route after registering
router.get('/profile', function (req, res, next) {
  User.findById(req.session.userId)
    .exec(function (error, user) {
      if (error) {
        return next(error);
      } else {
        return res.json({ name: user.username});
      }
    });
});

// GET /logout
router.get('/logout', function(req, res, next) {
  if (req.session) {
    // delete session object
    req.session.destroy(function(err) {
      if(err) {
        return next(err);
      } else {
        return res.redirect('/');
      }
    });
  }
});

module.exports = router;