'use strict';

const AWS = require('aws-sdk');
const s3 = new AWS.S3({apiVersion: '2006-03-01'});
const fs = require('fs');
const tagReader = require('jsmediatags');

exports.handler = (event, context, callback) => {

  if (event.Records.length > 1) {
    callback(`Too many records in event [${event.Records.length}]`);
    return;
  }

  const params = { 
    Bucket: event.Records[0].s3.bucket.name,
    Key: decodeURI(event.Records[0].s3.object.key).replace(/\+/g, ' ')
  };

  s3.getObject(params, function(err, data) {
    if (err) {
      console.error(err.code, err.message);

      return callback(err);
    }

    const tempName = `/tmp/${event.Records[0].responseElements['x-amz-request-id']}`;

    fs.writeFile(tempName, data.Body, function(err) {
      if(err) {
        console.log(err.code, err.message);

        return callback(err);
      }

      const stats = fs.statSync(tempName);
      console.log(`Size is now ${stats.size}`);
      tagReader.read(filepath, {
        onSuccess: function(tags) {
          for (i = 0; i < tagsRequested.length; i++) {
              switch (tagsRequested[i]) {
                  case 'artist':
                      tagsResolved.push(tags.tags.artist);
                      break;
                  case 'album':
                      tagsResolved.push(tags.tags.album);
                      break;
                  case 'title':
                      tagsResolved.push(tags.tags.title);
                      break;
                  case 'year':
                      tagsResolved.push(tags.tags.year);
                      break;
              }
          }
        },
        onError: function(error) {
            reject('Could not identify [' + tagsRequested + '] from track: ' +  error.info);
        }
      });
    }); 
  });
};