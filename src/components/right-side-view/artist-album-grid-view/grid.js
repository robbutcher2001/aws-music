import React, { Component } from 'react';

import GridRow from './grid-row';

const createRows = items => {
  const rows = [], size = 4;

  while (items.length > 0) {
    rows.push(items.splice(0, size));
  }

  return rows;
};

const Grid = props => {
  if (props.status === 'error') {
    return (
      <p>Please try again later</p>
    );
  }

  if (props.gridData.length < 1) {
    return (
      <div id="loading" className="row">
        <div className="12u 12u(mobile)">
          <i className="fa fa-cog fa-spin fa-3x fa-fw"></i>
          <span className="sr-only">Loading..</span>
        </div>
      </div>
    );
  }

  const gridRows = createRows(props.gridData);

  const GridRows = gridRows.map(gridRow => {
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
