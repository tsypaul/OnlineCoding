var express = require('express');
var router = express.Router();
var User = require('../models/User');

//POST routes for user management
//POST route for register
router.post('/register', function (req, res, next) {
  // confirm that user typed same password twice
  const {body}=req;
  const {
    username,
    password,
    passwordConf
  } = body;
  if (password !== passwordConf) {
     res.status(401).send('Passwords do not match');
     return next(err);
  }
   if (username &&
      password &&
      passwordConf) {
 
     var userData = {
       username: username,
       password: password
     }
     
     //Check if username is taken
     User.find({username: username}, function(err,user){
       if(err){
        res.status(404).send('Server Error');
       }else if(user.length>0){
        res.status(401).send('username is already taken');
        return next(err);
       }
     })
     //use schema.create to insert data into the db
     User.create(userData, function (err, user) {
       if (err) {
         res.status(404).send('Server Error');
         return next(err);
       } else {
        req.session.cookie.userId = user._id;
        req.session.cookie.expires=31556926,
        res.send({message:'Login Successful', session:req.session.cookie});
       }
      });
    } else {
        res.status(401).send('All fields are required');
        return next(err);
  }
});

//POST route for login
router.post('/login', function (req, res, next) {
  const {body}=req;
  const {
    username,
    password
  } = body;
  if (username && password) {
  User.authenticate(username, password, function (err, user) {
    if (err || !user) {
      res.send('Wrong username or password.');
      return next(err);
    } else {
      req.session.userId = user._id;
      req.session.cookie.expires=31556926,
      res.send({message:'Login Successful', session:req.session});
    }
    });
  }else{
    res.send('Username and password are required.');
    return next(err);
  }
});

//POST route for Password Change
router.post('/ChangePassword', function (req, res, next) {
  //Confirm that the user typed in the right password
  const {body}=req;
  const {
    currentPassword,
    newPassword,
    passwordConf
  } = body;
  User.findById(req.session.userId, function(err,user){
    User.authenticate(user.username, currentPassword, function (error, user) {
      if (error || !user) {
       res.send('Wrong password.');
        return next(err);
      } else {
        // confirm that user typed same password twice
        if (newPassword !== passwordConf) {
          res.send('Passwords do not match');
          return next(err);
        }else{
          User.findOne({username:user.username},function(err,user){
            if(err){
              res.status(404).send('Server Error');
              return next(err);
            }else{
              user.password=newPassword;
              user.save();
              res.send('Password was changed successfully');
            }
            
          });
        }
      }
      });
    });
});

//GET routes for user info and session management
//GET route for profile
router.get('/profile', function (req, res, next) {
  User.findById(req.session.userId, function (err, user) {
      if (err) {
        res.status(404).send('Server Error');
        return next(err);
      } else {
        return res.json({ name: user.username});
      }
    });
});

//GET route for logout
router.get('/logout', function(req, res, next) {
  if (req.session) {
    // delete session object
    req.session.destroy(function(err) {
      if(err) {
        res.status(404).send('Server Error');
        return next(err);
      } else {
        return res.redirect('/');
      }
    });
  }
});


router.get('/',function(req,res,next){
  res.send('home');
});

module.exports = router;