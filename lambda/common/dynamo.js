'use strict';

const AWS = require('aws-sdk');
const documentClient = new AWS.DynamoDB.DocumentClient();

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
    documentClient.scan(dynamoParams, (err, data) => {
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
