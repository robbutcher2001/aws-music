'use strict';

const uuid = require('uuid/v4');

const { duplicateToAnotherBucket } = require('../common');
const { getAlbumService } = require('./index');

const trackSourceBucket = process.env.TRACK_SOURCE_BUCKET;
const serveTrackBucket = process.env.SERVE_TRACK_BUCKET;
const serveTrackPrefix = process.env.SERVE_TRACK_PREFIX;

const getTrackService = (artistId, albumId, trackId) =>
  new Promise((resolve, reject) => {
    getAlbumService(artistId, albumId)
      .then(tracks => {
        const temporaryTrackId = uuid();
        const track = tracks.find((track, index, originalArray) => track.id === trackId);

        const copyParams = {
          Bucket: serveTrackBucket,
          CopySource: `/${trackSourceBucket}/${track.key}`,
          Key: temporaryTrackId
        };

        duplicateToAnotherBucket(copyParams)
          .then(() => resolve(`/${serveTrackPrefix}/${temporaryTrackId}`))
          .catch(err => reject(err));
      })
      .catch(err => reject(err));
  });

module.exports = {
  getTrackService
};
