'use strict';

const { listArtistsService } = require('../services');

exports.handler = (event, context, callback) => {
  const response = {};

  listArtistsService()
    .then(artists => {
      response.status = 'success';
      response.data = artists;
      callback(null, response);
    })
    .catch(err => {
      response.status = 'failed';
      response.message = err;
      callback(null, response);
    });
};
