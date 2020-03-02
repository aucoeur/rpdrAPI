require('dotenv').config();

// const path = require('path');
const port = process.env.PORT
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const app = require('./config/express');
const router = require('./controllers/index');

const checkAuth = require('./middleware/auth');
// Set db
require('./data/db');

app.use(cookieParser());

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
