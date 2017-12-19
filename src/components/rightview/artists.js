import React, { Component } from 'react';

import ArtistList from './artist-list';

export default class Artists extends Component {
  constructor(props) {
    super(props);

    this.state = {
      artists: []
    }

    this.getArtists();
  }

  getArtists() {
    fetch('/api/artists')
      .then(response => {
        response.json().then(artists => {
          this.setState({
            artists: artists.data
          });
        })
        .catch(err => {
          console.error(err);
        });
      })
      .catch(err => {
        console.error(err);
      });
  }

  render() {
    return (
      <section id="artists" className="two">
        <div className="container">
          <header>
            <h2>Artists</h2>
          </header>
          <p>Who would you like to listen to&#63;</p>
          <ArtistList artists={this.state.artists} />
        </div>
      </section>
    );
  }
}
