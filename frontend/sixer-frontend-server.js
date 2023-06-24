const express = require('express');
const path = require('path');
const https = require('https');


const DEFAULT_PORT = process.env.PORT || 3000;
const HOST = `0.0.0.0`;

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

app.get('/bids', (req, res) => {
    res.sendFile(path.join(__dirname + '/bids.html'));
});

app.get('/events', (req, res) => {
  res.sendFile(path.join(__dirname + '/events.html'));
});

app.listen(DEFAULT_PORT, HOST, () => {
  console.log(`Sample app listening on ${HOST}:${DEFAULT_PORT}!`)
});

module.exports = app;
