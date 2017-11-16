const artists = require('./artist-service');
const albums = require('./album-service');
const tracks = require('./track-service');

module.exports = Object.assign(
  {},
  artists,
  albums,
  tracks
);
