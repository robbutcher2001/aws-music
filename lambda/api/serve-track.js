'use strict';

const { getTrackService } = require('../services');

exports.handler = (event, context, callback) => {
  const response = {};

  getTrackService(event.params.artistId, event.params.albumId, event.params.trackId)
    .then(trackLocation => {
      response.status = 'success';
      response.data = {
        location: trackLocation
      };
      callback(null, response);
    })
    .catch(err => {
      response.status = 'failed';
      response.message = err;
      callback(null, response);
    });

  //use this Lambda to look up the key of the track then create temp copy of object from library to temp bucket
  //http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#copyObject-property
  //use a generated key for the file so it's a one time key and respond back to the browser with this temp location after this copy is complete
  //add a lifecycle on bucket to delete each file after it's been in the bucket for one day
  //user will be able to download the file using the link they've got from the app only for one day
  //user will not be able to guess location of other files due to unique UUID filenames
  //protect this endpoint with IAM so user cannot generate URLs for all files in library without being logged in
}
