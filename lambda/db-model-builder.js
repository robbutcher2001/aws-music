'use strict';

const { getS3Keys, getS3ObjectTags } = require('./common');

const trackBucket = process.env.TRACK_BUCKET;

const createTrack = trackKey =>
  new Promise((resolve, reject) => {
    const track = trackKey;
    const tagParams = {
      Bucket: trackBucket,
      Key: track.key
    };

    getS3ObjectTags(tagParams)
      .then(trackTags => {
        trackTags.TagSet.forEach(trackTag => {
          track[`${trackTag.Key}`] = trackTag.Value;
        });
        resolve(track);
      })
      .catch(err => {
        reject(err);
      });
  });

const searchObject = (obj, term) => {
  var found = false;
  Object.keys(obj).forEach(key => {
    console.log(`Looking at key: ${key} and object key: ${obj[key]}`);
    found = (found || term === obj[key]) ? true : false;
  });

  return found;
};

const searchLibraryArtist = (library, artist) => {
  var found = false;
  library.forEach(item => {
    found = (found || item.artist === artist) ? true : false;
  });

  return found;
};

const buildLibrary = tracks => {
  const library = [];

  tracks.forEach(track => {

    if (searchLibraryArtist(library, track.artist)) {
      console.log(`${track.artist} already in library`);
    }
    else {
      const item = {
        artist: track.artist,
        more: 'something'
      };
      library.push(item);
    }
  });

  return library;
};

exports.handler = (event, context, callback) => {
  getS3Keys({Bucket: trackBucket})
    .then(trackKeys => {

      const trackResponses = [];
      trackKeys.forEach(trackKey => {
        trackResponses.push(createTrack(trackKey));
      });

      Promise.all(trackResponses)
        .then(tracks => {
          console.log(buildLibrary(tracks));
          callback(null, JSON.stringify(tracks));
        })
        .catch(err => {
          callback(`Could not create all tracks: ${err}`);
        });
    })
    .catch(err => {
        callback(`Could not get track keys from S3: ${err}`)
    });
};
