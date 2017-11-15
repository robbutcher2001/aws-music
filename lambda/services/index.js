const artists = require('./artist-service');
const albums = require('./album-service');

module.exports = Object.assign(
  {},
  artists,
  albums
);
