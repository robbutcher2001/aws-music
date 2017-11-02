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

module.exports = {
  getS3Keys
};
