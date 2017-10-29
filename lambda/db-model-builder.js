'use strict';

const AWS = require('aws-sdk');
const documentClient = new AWS.DynamoDB.DocumentClient();

exports.handler = (event, context, callback) => {
  const params = {
    TableName : 'Artists',
    Item: {
      'hello': 'world'
    }
  };

  documentClient.put(params, function(err, data) {
    if (err) console.log(err);
    else console.log(data);
  });
};