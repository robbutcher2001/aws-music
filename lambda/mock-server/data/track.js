const track = (artistId, albumId, trackId) => {
  return {
    "status": 'success',
    "data": {
      location: `raw/${trackId}`
    }
  }
};

module.exports = track;
