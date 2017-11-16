'use strict';

const { scanDB, queryDB } = require('../common');

const dbLibraryTable = process.env.DB_LIBRARY_TABLE;

const listArtistsService = () =>
  new Promise((resolve, reject) => {
    const dynamoParams = {
      TableName: dbLibraryTable,
      ProjectionExpression: 'id, artist'
    };

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
      .catch(err => reject(err));
  });

const getArtistService = (artistId) =>
  new Promise((resolve, reject) => {
    const dynamoParams = {
      TableName: dbLibraryTable,
      ExpressionAttributeValues: {
        ':id': artistId
      },
      KeyConditionExpression: 'id = :id',
      ProjectionExpression: 'albums'
    };

    queryDB(dynamoParams)
      .then(dbItems => {
        const data = [];

        dbItems.Items.forEach(dbItem => {
          dbItem.albums.forEach(album => {
            data.push({
              id: album.id,
              name: album.name
            });
          });
        });
        resolve(data);
      })
      .catch(err => reject(err));
  });

// Not used yet or exported
const searchArtistsService = (searchTerm) =>
  new Promise((resolve, reject) => {
    const dynamoParams = {
      TableName: dbLibraryTable,
      IndexName: 'name-index',
      ExpressionAttributeValues: {
        ':artistSearch': searchTerm
      },
      KeyConditionExpression: 'name = :artistSearch',
      ProjectionExpression: 'albums'
    };

    queryDB(dynamoParams)
      .then(dbItems => {
        const data = [];
        //TODO
        resolve(data);
      })
      .catch(err => reject(err));
  });

module.exports = {
  listArtistsService,
  getArtistService
};
