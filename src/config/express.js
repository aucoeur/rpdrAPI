// const path = require('path');
const express = require("express");
// const exphbs = require('express-handlebars');
// const expressValidator = require('express-validator');
// const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const checkAuth = require("../middleware/auth");
const cors = require("cors");
const routes = require("../controllers/index");

const app = express();

// Handlebars
// app.engine('handlebars', exphbs({
//     defaultLayout: 'main',
//     // layoutsDir: path.join(__dirname, "views/layouts"),
//     // partialsDir: path.join(__dirname, "views/partials")
// }));
// app.engine('handblebars', exphbs)
// app.set('view engine', 'handlebars');
// app.set('views',path.join(__dirname,'views'))

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(cookieParser());

// Enable CORS - Cross Origin Resource Sharing.
app.use(cors());

// v6 has different implementation of express-validator, commented out because was i even using it? lol
// app.use(expressValidator());

app.use(checkAuth);

// Mount all routes on / path.
app.use("/", routes);

// #TODO: Additional non-API routes go here.

// app.use(express.static(path.join(__dirname, 'docs')))

module.exports = app;
