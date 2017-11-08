'use strict';

const AWS = require('aws-sdk');
const s3 = new AWS.S3({apiVersion: '2006-03-01'});
const fs = require('fs');
const tagReader = require('jsmediatags');

//Strip out everything but AWS permitted and alphanumeric characters
const cleanTag = tag => {
  return typeof tag !== 'undefined' ? tag.replace(/[^a-zA-Z0-9+-=._:/\ ]/g, '') : '';
};

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
          fileTags.push({Key: 'title', Value: cleanTag(tags.tags.title)});
          fileTags.push({Key: 'album', Value: cleanTag(tags.tags.album)});
          fileTags.push({Key: 'artist', Value: cleanTag(tags.tags.artist)});
          fileTags.push({Key: 'year', Value: cleanTag(tags.tags.year)});
          fileTags.push({Key: 'genre', Value: cleanTag(tags.tags.genre)});
          fileTags.push({Key: 'comment', Value: cleanTag(tags.tags.comment)});

          s3.putObjectTagging(uploadedTrack, function(err, data) {
            if (err) {
              console.error(err.code, err.message);
              return callback(err);
            }

            console.log(`Tags updated in ${uploadedTrack.Key}`);
            callback(null, `Tags updated in ${uploadedTrack.Key}`);
          });
        },
        onError: function(err) {
          callback(`Could not identify tags from track: ${err}`);
        }
      });
    });
  });
};
