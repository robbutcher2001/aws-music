const express = require('express');
const app = express();
const port = 3000;

const artists = require('./data/artists.js');

app.get('/', (request, response) => {
  response.send('Hello world');
});

app.get('/artists', (request, response) => {
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.json(artists);
});

app.listen(port, (err) => {
  if (err) {
    return console.log('Lambda mock server couldn\'t start', err);
  }

  console.log(`Lambda mock server listening on port ${port}`);
});
