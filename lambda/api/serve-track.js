'use strict';
const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

exports.handler = (event, context, callback) => {
  var queryParams = {
    ExpressionAttributeValues: {
     ":a": {
      S: "Leftfield"
      }
    },
    KeyConditionExpression: "artist = :a",
    ProjectionExpression: "albums",
    TableName: "library-dev"
  };
  dynamodb.query(queryParams, function(err, data) {
   if (err) callback(err); // an error occurred
   else     callback(null, data);           // successful response
  });

  //use this Lambda to look up the key of the track then create temp copy of object from library to temp bucket
  //http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#copyObject-property
  //use a generated key for the file so it's a one time key and respond back to the browser with this temp location after this copy is complete
  //add a lifecycle on bucket to delete each file after it's been in the bucket for one day
  //user will be able to download the file using the link they've got from the app only for one day
  //user will not be able to guess location of other files due to unique UUID filenames
  //protect this endpoint with IAM so user cannot generate URLs for all files in library without being logged in
}


function getArtists() {
  var params = {
  ProjectionExpression: "artist, id",
    TableName: "library-dev"
   };
dynamodb.scan(params, function(err, data) {
 if (err) callback(err); // an error occurred
 else     callback(null, data);           // successful response
});
}
