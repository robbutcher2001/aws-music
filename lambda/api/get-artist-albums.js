'use strict';

const { getArtistService } = require('../services');
const { sort } = require('../common');

exports.handler = (event, context, callback) => {
  const response = {};

  getArtistService(event.params.artistId)
    .then(albums => {
      response.status = 'success';
      response.data = sort(albums, 'name');
      callback(null, response);
    })
    .catch(err => {
      response.status = 'failed';
      response.message = err;
      callback(null, response);
    });
};
