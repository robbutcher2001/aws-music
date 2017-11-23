fetch('https://test-music.robertbutcher.co.uk/api/artists')
  .then(response => {
    response.json().then(json => {
      const mnt = document.getElementById('mnt');
      const artistsBlocks = artistBlockSplit(json.data);

      artistsBlocks.forEach(artistsBlock => {
        const outerDiv = document.createElement('div');
        outerDiv.className = 'row 0%';
        mnt.appendChild(outerDiv);

        artistsBlock.forEach(artistsBlock => {
          const div = document.createElement('div');
          div.className = '3u 12u(mobile)';
          div.innerHTML = artist.name;
          outerDiv.appendChild(div);
        });
      });
    });
  })
  .catch(err => console.error(err));

const artistBlockSplit = artists => {
  const artistsBlocks = [], size = 4;

  while (artists.length > 0) {
    artistsBlocks.push(artists.splice(0, size));
  }

  return artistsBlocks;
};
