'use strict';

const uuidv1 = require('uuid/v1');
const { getS3Keys, getS3ObjectTags, putDocument } = require('./common');

const trackBucket = process.env.TRACK_BUCKET;

const createTrack = trackKey =>
  new Promise((resolve, reject) => {
    const track = trackKey;
    getS3ObjectTags({Bucket: trackBucket, Key: track.key})
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

const getUniqueArtists = tracksFlatList => {
  return tracksFlatList.filter((track, index, originalArray) => {
    return originalArray.findIndex(searchTrack => track.artist === searchTrack.artist) === index;
  });
};

const getArtistAlbums = (tracksFlatList, artist) => {
  return tracksFlatList.filter(track => track.artist === artist).filter((track, index, originalArray) => {
    return originalArray.findIndex(searchTrack => track.album === searchTrack.album) === index;
  });
};

const getAlbumTracks = (tracksFlatList, artist, album) =>
  tracksFlatList.filter(track => track.artist === artist && track.album === album);

const buildDbModel = tracksFlatList => {
  const library = [];

  getUniqueArtists(tracksFlatList).forEach(artistItem => {
    const artist = {artist: artistItem.artist, albums: []};
    library.push(artist);
    getArtistAlbums(tracksFlatList, artistItem.artist).forEach(albumItem => {
      const album = {name: albumItem.album, tracks: []};
      artist.albums.push(album);
      getAlbumTracks(tracksFlatList, artistItem.artist, albumItem.album).forEach(trackItem => {
        album.tracks.push({title: trackItem.title, year: trackItem.year});
      });
    });
  });

  return library;
};

exports.handler = (event, context, callback) => {
  getS3Keys({Bucket: trackBucket})
    .then(trackKeys => {

      const trackPromises = [];
      trackKeys.forEach(trackKey => {
        trackPromises.push(createTrack(trackKey));
      });

      console.log(uuidv1());
      Promise.all(trackPromises)
        .then(tracksFlatList => {
          const items = buildDbModel(tracksFlatList);
          putDocument({TableName: 'Artists', Item: items})
            .then(data => callback(null, data))
            .catch(err => callback(err));
        })
        .catch(err => {
          callback(`Could not create all tracks: ${err}`);
        });
    })
    .catch(err => {
        callback(`Could not get track keys from S3: ${err}`)
    });
};
