require('dotenv').config();

// const path = require('path');
const port = process.env.PORT
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const app = require('./config/express');
const router = require('./controllers/index');

// Set db
require('./data/db');

app.use(cookieParser());

// Check auth
const checkAuth = (req, res, next) => {
  console.log("Checking authentication")
  if (typeof req.cookies.jwtToken === "undefined" || req.cookies.jwtToken === null) {
    console.log(req.cookies.jwtToken)
    req.user = null;
  } else {
    const token = req.cookies.jwtToken;
    const decodedToken = jwt.decode(token, { complete: true }) || {};
    req.user = decodedToken.payload;
  }
  next();
};  

app.use(checkAuth);

// Routes
app.use(router);


module.exports = app;

// Run Server
// module.parent check is required to support mocha watch
// src: https://github.com/mochajs/mocha/issues/1912
// if (!module.parent) {
  // listen on port config.port
  app.listen(port, () => {
      console.info(`server started on port ${port}! Click to view: http://localhost:${port}`);  // eslint-disable-line no-console
   });
// }
