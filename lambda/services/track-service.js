'use strict';

const uuid = require('uuid/v4');

const { duplicateToAnotherBucket } = require('../common');
const { getAlbumService } = require('./album-service');

const TRACK_SOURCE_BUCKET = process.env.TRACK_SOURCE_BUCKET;
const SERVE_TRACK_BUCKET = process.env.SERVE_TRACK_BUCKET;
const SERVE_TRACK_PREFIX = process.env.SERVE_TRACK_PREFIX;

const getTrackService = (artistId, albumId, trackId) =>
  new Promise((resolve, reject) => {
    getAlbumService(artistId, albumId)
      .then(tracks => {
        const temporaryTrackLocation = `${SERVE_TRACK_PREFIX}/${uuid()}`;
        const track = tracks.find((track, index, originalArray) => track.id === trackId);

        const copyParams = {
          Bucket: SERVE_TRACK_BUCKET,
          CopySource: `/${TRACK_SOURCE_BUCKET}/${track.key}`,
          Key: temporaryTrackLocation
        };

        duplicateToAnotherBucket(copyParams)
          .then(() => resolve(temporaryTrackLocation))
          .catch(err => reject(err));
      })
      .catch(err => reject(err));
  });

module.exports = {
  getTrackService
};
