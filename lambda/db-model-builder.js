'use strict';

const uuidv1 = require('uuid/v1');
const { getS3Keys, getS3ObjectTags, putDocument } = require('./common');

const trackBucket = process.env.TRACK_BUCKET;
const dbLibraryTable = process.env.DB_LIBRARY_TABLE;

const createTrack = trackKey =>
  new Promise((resolve, reject) => {
    const track = trackKey;
    getS3ObjectTags({Bucket: trackBucket, Key: track.key})
      .then(trackTags => {
        trackTags.TagSet.forEach(trackTag => {
          track[`${trackTag.Key}`] = (trackTag.Value === '' ? ' ' : trackTag.Value);
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

const buildDbModelItems = tracksFlatList => {
  const items = [];

  getUniqueArtists(tracksFlatList).forEach(artistItem => {
    const artist = {uuid: uuidv1(), artist: artistItem.artist, albums: []};
    items.push(artist);
    getArtistAlbums(tracksFlatList, artistItem.artist).forEach(albumItem => {
      const album = {uuid: uuidv1(), name: albumItem.album, tracks: []};
      artist.albums.push(album);
      getAlbumTracks(tracksFlatList, artistItem.artist, albumItem.album).forEach(trackItem => {
        album.tracks.push({uuid: uuidv1(), key: trackItem.key, title: trackItem.title, year: trackItem.year});
      });
    });
  });

  return items;
};

exports.handler = (event, context, callback) => {
  getS3Keys({Bucket: trackBucket})
    .then(trackKeys => {

      const trackPromises = [];
      trackKeys.forEach(trackKey => {
        trackPromises.push(createTrack(trackKey));
      });

      Promise.all(trackPromises)
        .then(tracksFlatList => {
          const itemPromises = [];
          buildDbModelItems(tracksFlatList).forEach(item => {
            itemPromises.push(putDocument({TableName: dbLibraryTable, Item: item}));
          });
          Promise.all(itemPromises)
            .then(data => callback(null, data))
            .catch(err => callback(err));
        })
        .catch(err => {
          callback(`Could not create all tracks: ${err}`);
        });
    })
    .catch(err => {
        callback(`Could not get track keys from S3: ${err}`);
    });
};
