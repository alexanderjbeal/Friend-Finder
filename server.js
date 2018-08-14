// Setting up useful server functionality
const express = require('express');
const bodyParser = require('body-parser');

// Tells node we're using an express server
const app = express();
const PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(express.static('./app/public'));

// Router
// The below points our server to a series of "route" files.
// These routes give our server a "map" of how to respond when users visit or request data from various URLs.
require("./app/routing/htmlRoutes")(app);
require("./app/routing/apiRoutes")(app);

// Starting the server
app.listen(PORT, function() {
  console.log(`App listening on port: ${PORT}`);
});