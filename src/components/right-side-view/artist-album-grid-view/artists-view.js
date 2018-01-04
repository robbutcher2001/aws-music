import React, { Component } from 'react';

import Grid from './grid';

const createRows = items => {
  const rows = [], size = 4;

  while (items.length > 0) {
    rows.push(items.splice(0, size));
  }

  return rows;
};

export default class ArtistsView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      gridTitle: '',
      gridHeading: 'Hold up, loading..',
      gridRows: []
    }

    this.getArtists();
  }

  getArtists() {
    fetch(`${__API_BASE__}/artists`)
      .then(response => {
        response.json().then(artists => {
          this.setState({
            gridTitle: 'Artists',
            gridHeading: 'Who would you like to listen to?',
            gridRows: createRows(artists.data)
          });
        })
        .catch(err => this.handleError(err));
      })
      .catch(err => this.handleError(err));
  }

  handleError(err) {
    this.setState({
      gridTitle: 'Something went wrong',
      gridHeading: 'Artists cannot be loaded'
    });
    console.error(err);
  };

  render() {
    return (
      <section className="two">
        <div className="container">
          <h2>{this.state.gridTitle}</h2>
          <p>{this.state.gridHeading}</p>
          <Grid gridRows={this.state.gridRows} />
        </div>
      </section>
    );
  }
}
