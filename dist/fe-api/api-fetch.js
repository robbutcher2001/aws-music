document.addEventListener('DOMContentLoaded', () => {
  const path = window.location.pathname.split('/');

  if (path.length > 6) {
    const artistId = path[2];
    const albumId = path[4];
    const trackId = path[6];
    getTrack(artistId, albumId, trackId);
  }
  else if (path.length > 4) {
    const artistId = path[2];
    const albumId = path[4];
    listTracks(artistId, albumId);
  }
  else if (path.length > 2) {
    const artistId = path[2];
    listAlbums(artistId);
  }
  else {
    listArtists();
  }
});

const getTrack = (artistId, albumId, trackId) => {
  const mnt = document.getElementById('mnt');

  fetch(`/api/artist/${artistId}/album/${albumId}/track/${trackId}`)
    .then(response => {
      response.json().then(json => {
        console.log(json);
        const audio = document.createElement('audio');
        audio.setAttribute('autoPlay', '');
        audio.setAttribute('controls', '');

        const source = document.createElement('source');
        source.setAttribute('src', `/${json.data.location}`);
        audio.appendChild(source);

        mnt.appendChild(audio);
      });
    })
    .catch(err => {
      console.log(err);
      mnt.innerHTML(err);
    });
};

const listTracks = (artistId, albumId) => {
  const mnt = document.getElementById('mnt');

  fetch(`/api/artist/${artistId}/album/${albumId}/tracks`)
    .then(response => {
      const ctaButton = document.getElementById('cta-button');
      ctaButton.innerHTML = 'Tracks';
      renderResponse(response, createTrackLink.bind(this, artistId, albumId), mnt);
    })
    .catch(err => {
      mnt.innerHTML(err);
    });
};

const listAlbums = artistId => {
  const mnt = document.getElementById('mnt');

  fetch(`/api/artist/${artistId}/albums`)
    .then(response => {
      const ctaButton = document.getElementById('cta-button');
      ctaButton.innerHTML = 'Albums';
      renderResponse(response, createAlbumLink.bind(this, artistId), mnt);
    })
    .catch(err => {
      mnt.innerHTML(err);
    });
};

const listArtists = (ins) => {
  const mnt = document.getElementById('mnt');

  fetch('/api/artists')
    .then(response => {
      renderResponse(response, createArtistLink, mnt);
    })
    .catch(err => {
      mnt.innerHTML(err);
    });
};

const renderResponse = (response, linkFunction, mnt) => {
  response.json().then(json => {
    const responseBlocks = responseBlockSplit(json.data);

    responseBlocks.forEach(responseBlock => {
      const outerDiv = document.createElement('div');
      outerDiv.className = 'row 0%';
      mnt.appendChild(outerDiv);

      responseBlock.forEach(block => {
        const div = document.createElement('div');
        div.className = '3u 6u(mobile)';
        div.appendChild(linkFunction(block));
        outerDiv.appendChild(div);
      });
    });
  });
};

const responseBlockSplit = responseBlock => {
  const responseBlocks = [], size = 4;

  while (responseBlock.length > 0) {
    responseBlocks.push(responseBlock.splice(0, size));
  }

  return responseBlocks;
};

const createArtistLink = artist => {
  const a = document.createElement('a');
  a.href = `/artist/${artist.id}`;
  a.innerHTML = artist.name;

  return a;
};

const createAlbumLink = (artistId, album) => {
  const a = document.createElement('a');
  a.href = `/artist/${artistId}/album/${album.id}`;
  a.innerHTML = album.name;

  return a;
};

const createTrackLink = (artistId, albumId, track) => {
  const a = document.createElement('a');
  a.href = `/artist/${artistId}/album/${albumId}/track/${track.id}`;
  a.innerHTML = track.title;

  return a;
};
