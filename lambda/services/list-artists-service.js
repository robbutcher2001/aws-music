'use strict';

const { scanDB } = require('../common');

const dbLibraryTable = process.env.DB_LIBRARY_TABLE;

const dynamoParams = {
  TableName: dbLibraryTable,
  ProjectionExpression: 'id, artist'
};

const listArtists = () =>
  new Promise((resolve, reject) => {
    scanDB(dynamoParams)
      .then(dbItems => {
        const data = [];

        dbItems.Items.forEach(dbItem => {
          data.push({
            id: dbItem.id,
            name: dbItem.artist
          });
        });
        resolve(data);
      })
      .catch(err => {
        reject(err);
      });
  });

module.exports = {
  listArtists
};
