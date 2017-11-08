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

const searchObject = (obj, term) => {
  var found = false;
  Object.keys(obj).forEach(key => {
    console.log(`Looking at key: ${key} and object key: ${obj[key]}`);
    found = (found || term === obj[key]) ? true : false;
  });

  return found;
};

const getLibraryArtist = (library, artist) => {
  var found;
  library.forEach(item => {
    if (item.artist === artist) {
      found = item;
    }
  });

  return found;
};

const getLibraryAlbum = (library, artist, album) => {
  var found;
  library.forEach(item => {
    if (item.artist === artist) {
      item.albums.forEach(existingAlbum => {
        if (existingAlbum.name === album) {
          found = item;
        }
      });
    }
  });

  return found;
};

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

const buildLibrary = tracks => {
  const library = [];

  // Build artists
  tracks.forEach(track => {
    if (typeof track.artist !== 'undefined') {
      const item = getLibraryArtist(library, track.artist);
      if (typeof item === 'undefined') {
        const item = {
          artist: track.artist,
          albums: []
        };
        library.push(item);
      }
      else {
        console.log(`${track.artist} already in library`);
      }
    }
  });

  // Build albums
  tracks.forEach(track => {
    const item = getLibraryAlbum(library, track.artist, track.album);
    if (typeof item === 'undefined') {
      const artist = getLibraryArtist(library, track.artist);
      if (typeof artist !== 'undefined') {
        artist.albums.push({
          name: track.album,
          tracks: []
        });
      }
    }
    else {
      console.log(`${track.album} already in library`);
    }
  });

  // Add tracks
  tracks.forEach(track => {
    const item = getLibraryAlbum(library, track.artist, track.album);
    if (typeof item !== 'undefined') {
      const album = item.albums.find(album => album.name === track.album);
      album.tracks.push({
        title: track.title,
        year: track.year
      });
    }
    else {
      console.log(`${track.title} doesn't have a place to go in library`);
    }
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

      Promise.all(trackPromises)
        .then(tracksFlatList => {
          callback(null, JSON.stringify(buildDbModel(tracksFlatList)));
        })
        .catch(err => {
          callback(`Could not create all tracks: ${err}`);
        });
    })
    .catch(err => {
        callback(`Could not get track keys from S3: ${err}`)
    });
};
