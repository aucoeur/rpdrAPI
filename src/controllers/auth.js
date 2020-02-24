const express = require('express');
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const router = express.Router(); // eslint-disable-line new-cap

// SIGN UP
router.post('/signup', (req, res) => {
  const user = new User(req.body)
  user.save().then(user => {
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "60 days" });
    res.json({'jwttoken': token})
  }).catch(err => {
    console.log(err.message);
    return res.status(400).send({ err: err });
  });
})

// LOGIN
router.post('/login', (req, res) => {

  const username = req.body.username;
  const password = req.body.password;
  // Find this user name
  User.findOne({ username }, "username password")
  .then(user => {
    if (!user) {
      // User not found
      return res.status(401).send({ message: "Wrong Username or Password" });
    }
    // Check the password
    user.comparePassword(password, (err, isMatch) => {
      if (!isMatch) {
          // Password does not match
          return res.status(401).send({ message: "Wrong Username or password" });
      }
      // Create a token
      const token = jwt.sign({ _id: user._id, username: user.username }, process.env.JWT_SECRET, {
          expiresIn: "60 days"
      });
      // Set a cookie and redirect to root
      res.json({'jwttoken': token})
    });
  })
  .catch(err => {
    console.log(err);
  });

  // LOGOUT
  router.get('/logout', (req, res) => {
    res.clearCookie('nToken');
    res.redirect('/');
  });
  
})

module.exports = router;