import React, { Component } from 'react';
import { connect } from 'react-redux';

const createRowData = items => {
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
          <a href={`/artist/${rowItem.id}`} className="image fit"><img src={rowItem.albumart !== '-' ? `/${rowItem.albumart}` : '/images/headphones.png'} alt="" /></a>
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

export class Grid extends Component {

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
    if (!this.props.artists || this.props.artists.length < 1) {
      return this.renderWithContainer(
        <div id="loading" className="row">
          <div className="12u 12u(mobile)">
            <i className="fa fa-cog fa-spin fa-3x fa-fw"></i>
            <span className="sr-only">Loading..</span>
          </div>
        </div>
      );
    }

    const rowData = createRowData(this.props.artists);

    const GridRows = rowData.map(row => {
      return (
        <GridRow key={row[0].id} rowData={row}/>
      );
    });

    return this.renderWithContainer(
      <div>
        <h2>{this.props.gridInfo.gridTitle}</h2>
        <p>{this.props.gridInfo.gridHeading}</p>
        <div id="grid">
          {GridRows}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log(state);
  return {
    gridInfo: state.gridInfo,
    artists: state.artists
  };
}

export default connect(mapStateToProps)(Grid);
