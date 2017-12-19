import React, { Component } from 'react';

import ArtistListItem from './artist-list-item';

const ArtistList = props => {
  if (props.artists.length < 1) {
    return (
      <div id="loading" className="row">
        <div className="12u 12u(mobile)">
          <i className="fa fa-cog fa-spin fa-3x fa-fw"></i>
          <span className="sr-only">Loading..</span>
        </div>
      </div>
    );
  }

  const Rows = createArtistRows(props.artists).map(row => {
    return (
      <ArtistListItem key={row[0].id} artists={row}/>
    );
  });

  return (
    <div id="artist-list" className="hide">
      {Rows}
    </div>
  );
};

const createArtistRows = artists => {
  const rows = [], size = 4;

  while (artists.length > 0) {
    rows.push(artists.splice(0, size));
  }

  return rows;
};

export default ArtistList;
