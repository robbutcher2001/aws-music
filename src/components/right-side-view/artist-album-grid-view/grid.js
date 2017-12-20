import React, { Component } from 'react';

import GridRow from './grid-row';

const Grid = props => {
  if (props.gridRows.length < 1) {
    return (
      <div id="loading" className="row">
        <div className="12u 12u(mobile)">
          <i className="fa fa-cog fa-spin fa-3x fa-fw"></i>
          <span className="sr-only">Loading..</span>
        </div>
      </div>
    );
  }

  const GridRows = props.gridRows.map(gridRow => {
    return (
      <GridRow key={gridRow[0].id} gridRow={gridRow}/>
    );
  });

  return (
    <div id="grid">
      {GridRows}
    </div>
  );
};

export default Grid;
