// Requiring necessary npm packages
var express = require("express");
var session = require("express-session");

// Setting up port and requiring models for syncing
var PORT = process.env.PORT || 8082;
var db = require("./models");

// Creating express app
var app = express();
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
app.use(express.static("public"));

// Requiring our routes
require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);

// Syncing our database and logging a message to the user upon succes
db.sequelize.sync({ force: true }).then(function () {
  app.listen(PORT, function () {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});
