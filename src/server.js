
require('dotenv').config();

const app = require('./config/express');
const router = require('./controllers/index');
const api = require('./controllers/api')
const path = require('path');
const port = process.env.PORT

// Set db
require('./data/db');

// Middleware
const jwt = require('jsonwebtoken');
const exphbs = require('express-handlebars');

// Handlebars
app.engine('handlebars', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, "views/layouts"),
    partialsDir: path.join(__dirname, "views/partials")
}));
app.set('view engine', 'handlebars');
app.set('views',path.join(__dirname,'views'))

// Check auth
const checkAuth = (req, res, next) => {
  console.log("Checking authentication");
  if (typeof req.headers.jwttoken === "undefined" || req.headers.jwttoken === null) {
    req.user = null;
    next();
  } else {
    var token = req.headers.jwttoken;
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
app.use(checkAuth);

// Routes
app.use('/', router);
app.use('api/', api)

// Index
// app.get('/', (req, res) => res.render('index'))

// Run Server
// module.parent check is required to support mocha watch
// src: https://github.com/mochajs/mocha/issues/1912
if (!module.parent) {
  // listen on port config.port
  app.listen(port, () => {
      console.info(`server started on port ${port}! Click to view: http://localhost:${port}`);  // eslint-disable-line no-console
   });
}

module.exports = app;