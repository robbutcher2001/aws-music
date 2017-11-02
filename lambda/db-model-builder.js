'use strict';

const AWS = require('aws-sdk');
const s3 = new AWS.S3({apiVersion: '2006-03-01'});
const documentClient = new AWS.DynamoDB.DocumentClient();

const { getS3Keys } = require('./common');

const trackBucket = process.env.TRACK_BUCKET;

const getTrackTags = trackKey =>
  new Promise((resolve, reject) => {
    const taggingParams = {
      Bucket: trackBucket,
      Key: trackKey.key
    };
    s3.getObjectTagging(taggingParams, function(err, trackTags) {
      if (err) {
        reject(err);
      }
      else {
        trackTags.TagSet.forEach(trackTag => {
          trackKey[`${trackTag.Key}`] = trackTag.Value;
        });
        resolve(trackKey);
      }
    });
  });

exports.handler = (event, context, callback) => {
  getS3Keys({Bucket: trackBucket})
    .then(trackKeys => {

      const trackTagResponses = [];
      trackKeys.forEach(trackKey => {
        trackTagResponses.push(getTrackTags(trackKey));
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
  // const params = {
  //   TableName : 'Artists',
  //   Item: {
  //     'hello': 'world'
  //   }
  // };
  //
  // documentClient.put(params, function(err, data) {
  //   if (err) console.log(err);
  //   else console.log(data);
  // });
};
