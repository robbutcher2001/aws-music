'use strict';

const AWS = require('aws-sdk');
const s3 = new AWS.S3({
  apiVersion: '2006-03-01',
  region: 'eu-west-1'
});

const getS3Keys = keyParams =>
  new Promise((resolve, reject) => {
    const keys = [];

    s3.listObjectsV2(keyParams, function(err, returnedKeys) {
      if (err) {
        reject(err);
      }
      else {
        returnedKeys.Contents.forEach(returnedKey => {
          keys.push({
            key: returnedKey.Key
          });
        });

        if (returnedKeys.IsTruncated) {
            keyParams.ContinuationToken = returnedKeys.NextContinuationToken;
            getS3Keys(keyParams)
              .then(moreKeys => {
                resolve(keys.concat(moreKeys));
              })
              .catch(err => {
                reject(err);
              });
        }
        else {
          resolve(keys);
        }
      }
    });
  });

const getS3ObjectTags = s3Object =>
  new Promise((resolve, reject) => {
    const taggingParams = {
      Bucket: trackBucket,
      Key: s3Object.key
    };
    s3.getObjectTagging(taggingParams, function(err, trackTags) {
      if (err) {
        reject(err);
      }
      else {
        trackTags.TagSet.forEach(trackTag => {
          s3Object[`${trackTag.Key}`] = trackTag.Value;
        });
        resolve(s3Object);
      }
    });
  });

module.exports = {
  getS3Keys,
  getS3ObjectTags
};
