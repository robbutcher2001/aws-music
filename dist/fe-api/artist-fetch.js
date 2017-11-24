document.addEventListener('DOMContentLoaded', () => {
  const path = window.location.pathname.split('/');

  if (path.length > 2) {
    if (path[1] === 'artist') {
      const artistId = path[2];
      listAlbums(artistId);
    }
  }
  else {
    listArtists();
  }
});

const listAlbums = artistId => {
  const mnt = document.getElementById('mnt');

  fetch(`/api/artist/${artistId}/albums`)
    .then(response => {
      renderResponse(response, mnt);
    })
    .catch(err => {
      mnt.innerHTML(err);
    });
};

const listArtists = () => {
  const mnt = document.getElementById('mnt');

  fetch('/api/artists')
    .then(response => {
      renderResponse(response, mnt);
    })
    .catch(err => {
      mnt.innerHTML(err);
    });
};

const renderResponse = (response, mnt) => {
  response.json().then(json => {
    const responseBlocks = responseBlockSplit(json.data);

    responseBlocks.forEach(responseBlock => {
      const outerDiv = document.createElement('div');
      outerDiv.className = 'row 0%';
      mnt.appendChild(outerDiv);

      responseBlock.forEach(block => {
        const div = document.createElement('div');
        div.className = '3u 6u(mobile)';
        div.appendChild(createLink(block));
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

const createLink = block => {
  const a = document.createElement('a');
  a.href = `/artist/${block.id}`;
  a.innerHTML = block.name;

  return a;
};
