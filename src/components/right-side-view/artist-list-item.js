import React, { Component } from 'react';

const Row = props => {
  const RowItems = props.artists.map(artist => {
    return (
      <div key={artist.id} className="3u 6u(mobile)">
        <article className="item">
          <a href={`/artist/${artist.id}`} className="image fit"><img src={artist.albumart !== '-' ? `/${artist.albumart}` : '/images/headphones.png'} alt="" /></a>
          <header>
            <h3>{artist.name}</h3>
          </header>
        </article>
      </div>
    );
  });

  return (
    <div className="row">
      {RowItems}
    </div>
  );
}

export default Row;
