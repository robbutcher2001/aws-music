import React, { Component } from 'react';

import Grid from './grid';

export default class ArtistsView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      gridTitle: 'Artists',
      gridHeading: 'Hold up, loading..',
      gridData: []
    }

    this.getArtists();
  }

  getArtists() {
    fetch(`${__API_BASE__}/artists`)
      .then(response => {
        response.json().then(artists => {
          this.setState({
            gridHeading: 'Who would you like to listen to?',
            gridData: artists.data
          });
        })
        .catch(err => this.handleError(err));
      })
      .catch(err => this.handleError(err));
  }

  handleError(err) {
    this.setState({
      gridHeading: 'Fetch went wrong, artists cannot be loaded',
      status: 'error'
    });
    console.error(err);
  };

  render() {
    return (
      <section className="two">
        <div className="container">
          <h2>{this.state.gridTitle}</h2>
          <p>{this.state.gridHeading}</p>
          <Grid status={this.state.status} gridData={this.state.gridData} />
        </div>
      </section>
    );
  }
}
