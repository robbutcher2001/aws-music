'use strict';

const AWS = require('aws-sdk');
const s3 = new AWS.S3({apiVersion: '2006-03-01'});
const documentClient = new AWS.DynamoDB.DocumentClient();

const trackKeyParams = {
  Bucket: process.env.TRACK_BUCKET
};

//TODO: recurse if data.IsTruncated === true
const getTrackKeys = () =>
  new Promise((resolve, reject) => {
    const trackKeys = [];

    s3.listObjectsV2(trackKeyParams, function(err, data) {
      if (err) {
        reject(err);
      }
      else {
        data.Contents.forEach(track => {
          trackKeys.push(track.Key);
        });

        resolve(trackKeys);
      }
    });
  });

const getTrackTags = trackKeys => {
  trackKeys.forEach(trackKey => {
    console.log(trackKey);
  });

  // const headObjectParams = {
  //   Bucket: process.env.TRACK_BUCKET,
  //   Key: data.Contents[0].Key
  // };
  // s3.getObjectTagging(headObjectParams, function(err, data) {
  //   if (err) console.log(err, err.stack); // an error occurred
  //   else     console.log(data);           // successful response
  // });
};

exports.handler = (event, context, callback) => {
  getTrackKeys()
    .then(trackKeys => {
      console.log(JSON.stringify(trackKeys));
    })
    .catch(callback());
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
