const User = require("../models/user");
const jwt = require('jsonwebtoken');

//Check auth - headers
let checkAuth = (req, res, next) => {
    console.log("Checking authentication");
    
    const authorization = req.headers['authorization']
    console.log(authorization)

  if (typeof authorization === "undefined" || authorization === null) {
    req.user = null;
    next();
  } else {
    const bearer = authorization.split(' ');
    let token = bearer[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
          console.log('Error during authentication: Invalid signature')
          req.user = null;
      } else {
          req.user = decodedToken;
      }
      next();
    })
  }
};

// Check auth - cookies
// const checkAuth = (req, res, next) => {
//   console.log("Checking authentication")
//   if (typeof req.cookies.jwtToken === "undefined" || req.cookies.jwtToken === null) {
//     console.log(req.cookies.jwtToken)
//     req.user = null;
//   } else {
//     const token = req.cookies.jwtToken;
//     const decodedToken = jwt.decode(token, { complete: true }) || {};
//     req.user = decodedToken.payload;
//   }
//   next();
// };  

module.exports = checkAuth