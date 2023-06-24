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

app.post('/customer-preferences', (req, res) => {
    console.log(req.body)
    // res.send(req.body);
    https.post('sixinthecity.ai/api/survey', res => {
      let data = [];
      const headerDate = res.headers && res.headers.date ? res.headers.date : 'no response date';
      console.log('Status Code:', res.statusCode);
      console.log('Date in Response header:', headerDate);

      res.on('data', chunk => {
        data.push(chunk);
      });

      res.on('end', () => {
        console.log('Response ended: ');
        const output = JSON.parse(Buffer.concat(data).toString());
        console.log(output);
        res.send(output)
      });
  }).on('error', err => {
    console.log('Error: ', err.message);
  });
});

app.listen(DEFAULT_PORT, HOST, () => {
  console.log(`Sample app listening on ${HOST}:${DEFAULT_PORT}!`)
});

module.exports = app;
