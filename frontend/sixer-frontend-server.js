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

/** bodyParser.urlencoded(options)
 * Parses the text as URL encoded data (which is how browsers tend to send form data from regular forms set to POST)
 * and exposes the resulting object (containing the keys and values) on req.body
 */

app.use(bodyParser.urlencoded({
    extended: true
}));

/**bodyParser.json(options)
 * Parses the text as JSON and exposes the resulting object on req.body.
 */
app.use(bodyParser.json());

// Setup app folders.
app.use(express.static(__dirname));

// Set up a route for index.html
app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.post('/customer-preferences', (req, res) => {
    req = JSON.parse(req);

    req = JSON.parse(req);
    console.log(req.body)
    res.send(req);
});

app.listen(DEFAULT_PORT, () => {
    console.log(`Sample app listening on port ${DEFAULT_PORT}!`)
});

module.exports = app;