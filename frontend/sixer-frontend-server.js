const express = require('express');
const path = require('path');
const bodyParser = require("body-parser");

/**
 * Helper functions
 */
function stringify(obj) {
    let cache = [];
    let str = JSON.stringify(obj, function(key, value) {
      if (typeof value === "object" && value !== null) {
        if (cache.indexOf(value) !== -1) {
          // Circular reference found, discard key
          return;
        }
        // Store value in our collection
        cache.push(value);
      }
      return value;
    });
    cache = null; // reset the cache
    return str;
}

const DEFAULT_PORT = process.env.PORT || 3000;

// initialize express.
const app = express();

// For parsing application/json
app.use(express.json());
 
// For parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Setup app folders.
app.use(express.static(__dirname));

// Set up a route for index.html
app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.post('/customer-preferences', (req, res) => {
    console.log(req.body)
    res.send(req.body);
});

app.listen(DEFAULT_PORT, () => {
    console.log(`Sample app listening on port ${DEFAULT_PORT}!`)
});

module.exports = app;