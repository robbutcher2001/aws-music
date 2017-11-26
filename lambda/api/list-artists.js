'use strict';

const { listArtistsService } = require('../services');
const { sort } = require('../common');

exports.handler = (event, context, callback) => {
  const response = {};

  listArtistsService()
    .then(artists => {
      response.status = 'success';
      response.data = sort(artists, 'name');
      callback(null, response);
    })
    .catch(err => {
      response.status = 'failed';
      response.message = err;
      callback(null, response);
    });
};
