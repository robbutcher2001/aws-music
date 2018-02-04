import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const createRowData = originalItems => {
  // We don't want to mutate the original object
  const items = Object.assign([], originalItems);
  const rows = [], size = 4;

  while (items.length > 0) {
    rows.push(items.splice(0, size));
  }

  return rows;
}

const GridRow = props => {
  const RowItems = props.rowData.map(rowItem => {
    return (
      <div key={rowItem.id} className="3u 6u(mobile)">
        <article className="item">
          <Link className="image fit" to={`/artist/${rowItem.id}`}>
            <img src={rowItem.albumart !== '-' ? `/${rowItem.albumart}` : '/images/headphones.png'} alt="" />
          </Link>
          <header>
            <h3>{rowItem.name}</h3>
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

export default class Grid extends Component {
  constructor(props) {
    super(props);
  }

  renderWithContainer(contents) {
    return (
      <section className="two">
        <div className="container">
          {contents}
        </div>
      </section>
    )
  }

  render() {
    if (!this.props.gridData || this.props.gridData.length < 1) {
      return this.renderWithContainer(
        <div id="loading" className="row">
          <div className="12u 12u(mobile)">
            <i className="fa fa-cog fa-spin fa-3x fa-fw"></i>
            <span className="sr-only">Loading..</span>
          </div>
        </div>
      );
    }

    const rowData = createRowData(this.props.gridData);

    const GridRows = rowData.map(row => {
      return (
        <GridRow key={row[0].id} rowData={row}/>
      );
    });

    return this.renderWithContainer(
      <div>
        <h2>{this.props.gridTitle}</h2>
        <p>{this.props.gridHeading}</p>
        <div id="grid">
          {GridRows}
        </div>
      </div>
    );
  }
}
