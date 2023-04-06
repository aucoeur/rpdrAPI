require('dotenv').config();

const port = process.env.PORT

const app = require('./config/express');

// Set db
require('./data/db');


// Run Server
// module.parent check is required to support mocha watch
// src: https://github.com/mochajs/mocha/issues/1912
// if (!module.parent) {
  // listen on port config.port
  app.listen(port, () => {
      console.info(`server started on port ${port}! Click to view: http://localhost:${port}`);  // eslint-disable-line no-console
   });
// }

module.exports = app;