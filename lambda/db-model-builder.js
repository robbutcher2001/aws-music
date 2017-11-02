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

const getLibraryArtist = (library, artist) => {
  library.forEach(item => {
    if (item.artist === artist) {
      return item;
    }
  });

  return null;
};

const searchLibraryAlbums = (library, album) => {
  var found = false;
  library.forEach(item => {
    item.albums.forEach(album => {
      found = (found || album.name === album) ? true : false;
    });
  });

  return found;
};

const buildLibrary = tracks => {
  const library = [];

  // Build artists
  tracks.forEach(track => {
    if (getLibraryArtist(library, track.artist) === null) {
      library.push({artist: track.artist});
    }
    else {
      console.log(`${track.artist} already in library`);
    }
  });

  // // Build albums
  // tracks.forEach(track => {
  //   if (searchLibraryAlbums(library, track.album)) {
  //     console.log(`${track.album} already in library`);
  //   }
  //   else {
  //     const item = {
  //       artist: track.artist,
  //       more: 'something'
  //     };
  //     library.push(item);
  //   }
  // });

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
