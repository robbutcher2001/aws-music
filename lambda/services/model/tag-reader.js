'use strict';

const AWS = require('aws-sdk');
const s3 = new AWS.S3({apiVersion: '2006-03-01'});
const fs = require('fs');
const tagReader = require('jsmediatags');

//Strip out everything but AWS permitted and alphanumeric characters
const cleanTag = tag => {
  return typeof tag !== 'undefined' ? tag.replace(/[^a-zA-Z0-9+-=._:/\ ]/g, '') : '';
};

const extractAndUploadAlbumArt = (albumArtTag, albumArtName, targetBucket) =>
  new Promise((resolve, reject) => {
    let resolveMessage = '-';

    if (typeof albumArtTag !== 'undefined') {
      const albumArtLocation = `album-art/${albumArtName}`;
      const headObjectParams = {
        Bucket: targetBucket,
        Key: albumArtLocation
      };

      s3.headObject(headObjectParams, function(err, data) {
        if (err && err.code === 'NotFound') {
          console.debug(`Album art doesn't exist so creating new one`);
          const putObjectParams = Object.assign({}, headObjectParams, {
            Body: Buffer.from(albumArtTag.data),
            ContentType: albumArtTag.format
          });
          s3.putObject(params, function(err, data) {
            if (err) {
              return reject(err);
            }
            else {
              resolveMessage = albumArtLocation;
            }
          });
        }
        else if (err) {
          return reject(err);
        }
        else {
          console.info(`Album art already exists at location [${albumArtLocation}]`);
          resolveMessage = albumArtLocation;
        }
      });
    }

    resolve(resolveMessage);
  });

exports.handler = (event, context, callback) => {

  if (event.Records.length > 1) {
    console.error(`Too many records in event [${event.Records.length}], can only process 1`);
    return callback(`Too many records in event [${event.Records.length}], can only process 1`);
  }

  const uploadedTrack = {
    Bucket: event.Records[0].s3.bucket.name,
    Key: decodeURIComponent(event.Records[0].s3.object.key).replace(/\+/g, ' ')
  };

  s3.getObject(uploadedTrack, function(err, data) {
    if (err) {
      console.error(err.code, err.message);
      return callback(err);
    }

    const fileName = `/tmp/${event.Records[0].responseElements['x-amz-request-id']}`;

    fs.writeFile(fileName, data.Body, function(err) {
      if (err) {
        console.error(err.code, err.message);
        return callback(err);
      }

      const fileTags = [];
      uploadedTrack.Tagging = {
        TagSet: fileTags
      };

      tagReader.read(fileName, {
        onSuccess: function(tags) {
          const artist = cleanTag(tags.tags.artist);
          const album = cleanTag(tags.tags.album);
          fileTags.push({ Key: 'title', Value: cleanTag(tags.tags.title) });
          fileTags.push({ Key: 'album', Value: album });
          fileTags.push({ Key: 'artist', Value: artist });
          fileTags.push({ Key: 'year', Value: cleanTag(tags.tags.year) });
          fileTags.push({ Key: 'genre', Value: cleanTag(tags.tags.genre) });
          fileTags.push({ Key: 'comment', Value: cleanTag(
            (typeof tags.tags.comment !== 'undefined' ? tags.tags.comment.text : '-')
          )});

          const albumArtName = artist.toLowerCase().concat('-', album.toLowerCase()).replace(/\s/g, '-');

          extractAndUploadAlbumArt(tags.tags.picture, albumArtName, 'rob-dump-place')
            .then(albumArtLocation => {
              fileTags.push({ Key: 'album-art', Value: albumArtLocation });

              s3.putObjectTagging(uploadedTrack, function(err, data) {
                if (err) {
                  console.error(err.code, err.message);
                  callback(err);
                }
                else {
                  console.log(`Tags updated in ${uploadedTrack.Key}`);
                  callback(null, `Tags updated in ${uploadedTrack.Key}`);
                }
              });
            })
            .catch(err => {
              console.error(err);
              callback(err);
            });
        },
        onError: function(err) {
          callback(`Could not identify tags from track: ${err}`);
        }
      });
    });
  });
};
