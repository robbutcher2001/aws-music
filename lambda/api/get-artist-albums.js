'use strict';

const { getArtistService } = require('../services');

exports.handler = (event, context, callback) => {
  const response = {};

  getArtistService(event.params.artistId)
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
