'use strict';

const { getAlbumService } = require('../services');

exports.handler = (event, context, callback) => {
  const response = {};

  getAlbumService(event.params.artistId, event.params.albumId)
    .then(tracks => {
      response.status = 'success';
      response.data = tracks;
      callback(null, response);
    })
    .catch(err => {
      response.status = 'failed';
      response.message = err;
      callback(null, response);
    });
};
