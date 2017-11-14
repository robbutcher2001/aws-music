'use strict';

const { scanDB } = require('../common');

const dbLibraryTable = process.env.DB_LIBRARY_TABLE;

const dynamoParams = {
  TableName: dbLibraryTable,
  ProjectionExpression: 'artist, id'
};

exports.handler = (event, context, callback) => {
  scanDB(dynamoParams)
    .then(success => callback(null, success))
    .catch(err => callback(err));
}
