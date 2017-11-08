'use strict';

exports.handler = (event, context, callback) => {
  var queryParams = {
  ExpressionAttributeValues: {
     ":v1": {
       S: "Shyer"
      }
    },
    KeyConditionExpression: "Artist = :v1",
    ProjectionExpression: "title",
    TableName: "library-dev"
  };
  dynamodb.query(params, function(err, data) {
   if (err) callback(err); // an error occurred
   else     callback(null, data);           // successful response
  });
}
