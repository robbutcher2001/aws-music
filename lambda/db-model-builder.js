'use strict';

const AWS = require('aws-sdk');
const s3 = new AWS.S3({apiVersion: '2006-03-01'});
const documentClient = new AWS.DynamoDB.DocumentClient();

const { getS3Keys, getS3ObjectTags } = require('./common');

const trackBucket = process.env.TRACK_BUCKET;

exports.handler = (event, context, callback) => {
  getS3Keys({Bucket: trackBucket})
    .then(trackKeys => {

      const trackTagResponses = [];
      trackKeys.forEach(trackKey => {
        trackTagResponses.push(getS3ObjectTags(trackKey));
      });

      Promise.all(trackTagResponses)
        .then(trackTags => {
          callback(null, JSON.stringify(trackTags));
        })
        .catch(err => {
          callback(`Could not extract tags from all tracks: ${err}`);
        });
    })
    .catch(err => {
        callback(`Could not get track keys from S3: ${err}`)
    });
};
