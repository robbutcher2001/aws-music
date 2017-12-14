document.addEventListener('DOMContentLoaded', () => {
  const ctaButton = document.getElementById('cta-button');
  const path = window.location.pathname.split('/');

  if (path.length > 6) {
    const artistId = path[2];
    const albumId = path[4];
    const trackId = path[6];
    getTrack(ctaButton, artistId, albumId, trackId);
  }
  else if (path.length > 4) {
    const artistId = path[2];
    const albumId = path[4];
    listTracks(ctaButton, artistId, albumId);
  }
  else if (path.length > 2) {
    const artistId = path[2];
    listAlbums(ctaButton, artistId);
  }
  else {
    listArtists(ctaButton);
  }

  //temp playlist
  const ctaPlaylist = document.getElementById('cta-playlist');
  ctaPlaylist.addEventListener('click', () => {
    getTrackLocations()
      .then(trackLocations => {
        console.log(`what is this? ${JSON.stringify(trackLocations)}`);
        const mnt = document.getElementById('mnt');
        ctaButton.innerHTML = 'Playing test playlist';
        const audio = document.createElement('audio');
        audio.setAttribute('autoPlay', '');
        audio.setAttribute('controls', '');
        audio.setAttribute('preload', 'auto');
        mnt.appendChild(audio);
        console.log(`Got tracks ${JSON.stringify(trackLocations)}`);
        playNextTrack(audio, trackLocations, 0);
      })
      .catch(err => {
        mnt.innerHTML = err;
      });
  });
});

const getTrackLocations = () =>
  new Promise((resolve, reject) => {
    const playlistTracks = [
      '/api/artist/585ac3ec-5877-4b26-8234-fc1f8b9576ba/album/03eb1db7-4f54-4f6d-88ad-89a1912f1b20/track/8c875913-f99f-4e92-be52-aaa951f881b8',
      '/api/artist/585ac3ec-5877-4b26-8234-fc1f8b9576ba/album/03eb1db7-4f54-4f6d-88ad-89a1912f1b20/track/e19220c1-4241-4623-9b1d-8986aa5aaefc',
      '/api/artist/585ac3ec-5877-4b26-8234-fc1f8b9576ba/album/03eb1db7-4f54-4f6d-88ad-89a1912f1b20/track/b4683722-f928-4a68-bace-40a1eccae36f',
      '/api/artist/585ac3ec-5877-4b26-8234-fc1f8b9576ba/album/03eb1db7-4f54-4f6d-88ad-89a1912f1b20/track/c061b105-7276-4a42-a7f9-7b66ee8ec50a'
    ];

    const playlistTrackLocations = [];

    playlistTracks.forEach(playlistTrack => {
      playlistTrackLocations.push(fetch(playlistTrack));
    });

    Promise.all(playlistTrackLocations)
      .then(responses => {
        const locations = [];
        const jsonResponses = [];
        responses.forEach(response => {
          jsonResponses.push(response.json());
        });

        Promise.all(jsonResponses)
          .then(everyJson => {
            everyJson.forEach(json => {
              locations.push(`/${json.data.location}`);
              console.log(`and here? /${locations}`);
              resolve(locations);
            });
          })
          .catch(err => reject(err));
      })
      .catch(err => reject(err));
  });

const playNextTrack = (audioTag, trackLocations, currentTrackCount) => {
  console.log(`Playing ${trackLocations[currentTrackCount]}`);
  audioTag.src = trackLocations[currentTrackCount];
  audioTag.setAttribute('title', 'iOS test title');
  audioTag.load();
  audioTag.play();

  audioTag.addEventListener('ended', () => {
    playNextTrack(audioTag, trackLocations, ++currentTrackCount);
  });
};

const getTrack = (ctaButton, artistId, albumId, trackId) => {
  const mnt = document.getElementById('mnt');

  fetch(`/api/artist/${artistId}/album/${albumId}/track/${trackId}`)
    .then(response => {
      response.json().then(json => {
        ctaButton.innerHTML = 'Playing';
        const audio = document.createElement('audio');
        audio.setAttribute('autoPlay', '');
        audio.setAttribute('controls', '');
        audio.setAttribute('preload', 'auto');
        audio.setAttribute('title', 'iOS test title');
        audio.addEventListener('ended', () => {
          audio.currentTime = 0;
          audio.play();
        });

        const source = document.createElement('source');
        source.setAttribute('src', `/${json.data.location}`);
        audio.appendChild(source);

        mnt.appendChild(audio);
      });
    })
    .catch(err => {
      mnt.innerHTML = err;
    });
};

const listTracks = (ctaButton, artistId, albumId) => {
  const mnt = document.getElementById('mnt');

  fetch(`/api/artist/${artistId}/album/${albumId}/tracks`)
    .then(response => {
      ctaButton.innerHTML = 'Tracks';
      renderResponse(response, createTrackLink.bind(this, artistId, albumId), mnt);
    })
    .catch(err => {
      mnt.innerHTML = err;
    });
};

const listAlbums = (ctaButton, artistId) => {
  const mnt = document.getElementById('mnt');

  fetch(`/api/artist/${artistId}/albums`)
    .then(response => {
      ctaButton.innerHTML = 'Albums';
      renderResponse(response, createAlbumLink.bind(this, artistId), mnt);
    })
    .catch(err => {
      mnt.innerHTML = err;
    });
};

const listArtists = (ctaButton) => {
  const mnt = document.getElementById('mnt');

  fetch('/api/artists')
    .then(response => {
      ctaButton.innerHTML = 'Listen Now';
      renderResponse(response, createArtistLink, mnt);
    })
    .catch(err => {
      mnt.innerHTML = err;
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
  a.className = 'image fit';

  const img = document.createElement('img');

  if (artist.albumart !== '-') {
    img.src = `/${artist.albumart}`;
  }
  else {
    img.src = `/images/headphones.png`;
  }
  a.appendChild(img);

  const div = document.createElement('div');
  div.innerHTML = artist.name;
  a.appendChild(div);

  return a;
};

const createAlbumLink = (artistId, album) => {
  const a = document.createElement('a');
  a.href = `/artist/${artistId}/album/${album.id}`;
  a.className = 'image fit';

  const img = document.createElement('img');

  if (album.albumart !== '-') {
    img.src = `/${album.albumart}`;
  }
  else {
    img.src = `/images/headphones.png`;
  }
  a.appendChild(img);

  const div = document.createElement('div');
  div.innerHTML = album.name;
  a.appendChild(div);

  return a;
};

const createTrackLink = (artistId, albumId, track) => {
  const a = document.createElement('a');
  a.href = `/artist/${artistId}/album/${albumId}/track/${track.id}`;
  a.innerHTML = track.title;

  return a;
};
