'use strict';

const { getAlbumService } = require('../services');
const { sort } = require('../common');

exports.handler = (event, context, callback) => {
  const response = {};

  getAlbumService(event.params.artistId, event.params.albumId)
    .then(tracks => {
      response.status = 'success';
      response.data = sort(tracks, 'title');
      callback(null, response);
    })
    .catch(err => {
      response.status = 'failed';
      response.message = err;
      callback(null, response);
    });
};
