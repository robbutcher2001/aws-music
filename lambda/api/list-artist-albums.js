'use strict';

const { getArtistService } = require('../services');

exports.handler = (event, context, callback) => {
  const artistId = event.params;
  console.log(JSON.stringify(artistId));

  const response = {};

  getArtistService('dd10bcc3-04f7-4930-bcbb-8056358b89fa')
    .then(albums => {
      response.status = 'success';
      response.data = albums;
      callback(null, response);
    })
    .catch(err => {
      response.status = 'failed';
      response.message = err;
      callback(null, response);
    });
};
