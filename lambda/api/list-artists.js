'use strict';

const { scanDB } = require('../common');

const dbLibraryTable = process.env.DB_LIBRARY_TABLE;

const dynamoParams = {
  TableName: dbLibraryTable,
  ProjectionExpression: 'artist, id'
};

exports.handler = (event, context, callback) => {
  const response = {};

  scanDB(dynamoParams)
    .then(dbItems => {
      response.status = 'success';
      response.artists = [];

      dbItems.Items.forEach(dbItem => {
        response.artists.push({
          id: dbItem.id,
          name: dbItem.artist
        });
      });
      callback(null, response);
    })
    .catch(err => {
      response.status = 'failed';
      response.message = err;
      callback(null, response);
    });
}
