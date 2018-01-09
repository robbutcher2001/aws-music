const express = require('express');
const app = express();
const port = 3000;

const artists = require('./data/artists.js');
const albums = require('./data/albums.js');
const tracks = require('./data/tracks.js');
const track = require('./data/track.js');

app.get('/', (request, response) => {
  response.send('Music API Lambda dev server');
});

app.get('/artists', (request, response) => {
  setTimeout(() => {
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.json(artists);
  }, 3000);
});

app.get('/artist/:artistId/albums', (request, response) => {
  const { artistId } = request.params;

  response.setHeader('Access-Control-Allow-Origin', '*');
  response.json(albums(artistId));
});

app.get('/artist/:artistId/album/:albumId/tracks', (request, response) => {
  const { artistId, albumId } = request.params;

  response.setHeader('Access-Control-Allow-Origin', '*');
  response.json(tracks(artistId, albumId));
});

app.get('/artist/:artistId/album/:albumId/track/:trackId', (request, response) => {
  const { artistId, albumId, trackId } = request.params;

  response.setHeader('Access-Control-Allow-Origin', '*');
  response.json(track(artistId, albumId, trackId));
});

app.listen(port, (err) => {
  if (err) {
    return console.log('Lambda mock server couldn\'t start', err);
  }

  console.log(`Lambda mock server listening on port ${port}`);
});
