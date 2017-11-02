'use strict';

const AWS = require('aws-sdk');
const s3 = new AWS.S3({apiVersion: '2006-03-01'});
const documentClient = new AWS.DynamoDB.DocumentClient();

const getTrackKeys = (trackKeyParams) =>
  new Promise((resolve, reject) => {
    const trackKeys = [];

    s3.listObjectsV2(trackKeyParams, function(err, tracks) {
      if (err) {
        reject(err);
      }
      else {
        tracks.Contents.forEach(track => {
          trackKeys.push({
            key: track.Key
          });
        });

        if (tracks.IsTruncated) {
            trackKeyParams.ContinuationToken = tracks.NextContinuationToken;
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

const getTrackTags = track => {
  new Promise((resolve, reject) => {
    const taggingParams = {
      Bucket: process.env.TRACK_BUCKET,
      Key: track
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
  const trackKeyParams = {
    Bucket: process.env.TRACK_BUCKET
  };

  getTrackKeys(trackKeyParams)
    .then(trackKeys => {
      console.log(JSON.stringify(trackKeys));
      // getTrackTags(trackKeys[0])
      //   .then(trackTags) => {
      //     console.log(trackTags);
      //   });
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
