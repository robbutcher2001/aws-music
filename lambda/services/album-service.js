'use strict';

const { queryDB } = require('../common');

const dbLibraryTable = process.env.DB_LIBRARY_TABLE;

const findAlbum = (albums, albumId) => {
  return albums.find((album, index, originalArray) => {
    return album.id === albumId;
  });
};

const getAlbumService = (artistId, albumId) =>
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
          findAlbum(dbItem.albums, albumId).tracks.forEach(track => data.push(track));
        });
        resolve(data);
      })
      .catch(err => reject(err));
  });

module.exports = {
  getAlbumService
};
