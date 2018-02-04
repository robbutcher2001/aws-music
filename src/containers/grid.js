import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchArtists } from '../actions/fetch-artists';

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
  constructor(props) {
    super(props);
    this.props.fetchArtists('artists');
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
        <h2>{this.props.gridTitle}</h2>
        <p>{this.props.gridHeading}</p>
        <div id="grid">
          {GridRows}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    gridTitle: state.gridInfo.gridTitle,
    gridHeading: state.gridInfo.gridHeading,
    artists: state.artists
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchArtists }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Grid);
