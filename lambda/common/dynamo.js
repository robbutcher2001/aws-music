'use strict';

const AWS = require('aws-sdk');
const documentClient = new AWS.DynamoDB.DocumentClient();
const dynamodb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

const putDocument = dynamoParams =>
  new Promise((resolve, reject) => {
    documentClient.put(dynamoParams, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });

const scanDB = dynamoParams =>
  new Promise((resolve, reject) => {
    dynamodb.scan(dynamoParams, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });

module.exports = {
  putDocument,
  scanDB
};
