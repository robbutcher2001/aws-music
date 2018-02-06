import React, { Component } from 'react';

//do we even need hrefs as /artist/ID/album/ID/track/ID when we display the tracks
//or just pull all the IDs from the state when we need to make a request to get track
const GridRow = props => {
  const GridItems = props.gridRow.map(gridItem => {
    return (
      <div key={gridItem.id} className="3u 6u(mobile)">
        <article className="item">
          <a href={`/artist/${gridItem.id}`} className="image fit"><img src={gridItem.albumart !== '-' ? `/${gridItem.albumart}` : '/images/headphones.png'} alt="" /></a>
          <header>
            <h3>{gridItem.name}</h3>
          </header>
        </article>
      </div>
    );
  });

  return (
    <div className="row">
      {GridItems}
    </div>
  );
}

export default GridRow;
