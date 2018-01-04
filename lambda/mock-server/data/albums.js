const albumData = {
  1: [{
    "id": "11",
    "name": "Acoustic",
    "albumart": "-"
  }],
  2: [{
    "id": "12",
    "name": "Sirens Of The Sea Remixed",
    "albumart": "-"
  }],
  3: [{
    "id": "13",
    "name": "Clsicos de la Fiesta",
    "albumart": "-"
  }],
  4: [{
    "id": "14",
    "name": "Agape - EP",
    "albumart": "-"
  }, {
    "id": "141",
    "name": "Islands",
    "albumart": "-"
  }],
  5: [{
    "id": "15",
    "name": "All In All",
    "albumart": "-"
  }, {
    "id": "151",
    "name": "Days Gone By",
    "albumart": "-"
  }],
  6: [{
    "id": "16",
    "name": "-",
    "albumart": "-"
  }],
  7: [{
    "id": "17",
    "name": "Booty Comes First / Bones Shakin",
    "albumart": "-"
  }],
  8: [{
    "id": "18",
    "name": "Candle Coast EP",
    "albumart": "-"
  }],
  9: [{
    "id": "19",
    "name": "Heartbeats - Single",
    "albumart": "-"
  }]
};

const albums = artistId => {
  const artistAlbums = albumData[artistId];

  if (typeof artistAlbums !== 'undefined') {
    return {
      "status": 'success',
      "data": artistAlbums
    }
  }
  else {
    return {
      "status": 'fail',
      "message": {}
    }
  }
};

module.exports = albums;
