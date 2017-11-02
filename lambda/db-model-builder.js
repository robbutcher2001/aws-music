'use strict';

const AWS = require('aws-sdk');
const s3 = new AWS.S3({apiVersion: '2006-03-01'});
const documentClient = new AWS.DynamoDB.DocumentClient();

const trackBucket = process.env.TRACK_BUCKET;

const getTrackKeys = trackKeyParams =>
  new Promise((resolve, reject) => {
    const trackKeys = [];

    s3.listObjectsV2(trackKeyParams, function(err, returnedTracks) {
      if (err) {
        reject(err);
      }
      else {
        returnedTracks.Contents.forEach(returnedTrack => {
          trackKeys.push({
            key: returnedTrack.Key
          });
        });

        if (returnedTracks.IsTruncated) {
            trackKeyParams.ContinuationToken = returnedTracks.NextContinuationToken;
            getTrackKeys(trackKeyParams)
              .then(nextKeys => {
                resolve(nextKeys);
              })
              .catch(err => {
                reject(err)
              });
        }
        else {
            resolve(trackKeys);
        }
      }
    });
  });

const getTrackTags = track =>
  new Promise((resolve, reject) => {
    const taggingParams = {
      Bucket: trackBucket,
      Key: track.key
    };
    s3.getObjectTagging(taggingParams, function(err, trackTags) {
      if (err) {
        reject(err);
      }
      else {
        track.trackTags = trackTags;
        resolve(track);
      }
    });
  });

exports.handler = (event, context, callback) => {
  getTrackKeys({Bucket: trackBucket})
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
