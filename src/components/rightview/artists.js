import React, { Component } from 'react';

import ArtistsLoading from './artists-loading';

export default class App extends Component {
  render() {
    return (
      <section id="artists" className="two">
        <div className="container">
          <header>
            <h2>Artists</h2>
          </header>
          <p>Who would you like to listen to&#63;</p>
          <ArtistsLoading />
        </div>
      </section>
    );
  }
}
