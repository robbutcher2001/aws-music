import React, { Component } from 'react';
import { connect } from 'react-redux';

export class Grid extends Component {

  renderArtists(artist) {
    return (
      <li key={artist.id}>{artist.name}</li>
    );
  }

  render() {
    if (!this.props.artists || this.props.artists.length < 1) {
      return (
        <div id="loading" className="row">
          <div className="12u 12u(mobile)">
            <i className="fa fa-cog fa-spin fa-3x fa-fw"></i>
            <span className="sr-only">Loading..</span>
          </div>
        </div>
      );
    }

    return (
      <ul>
        {this.props.artists.map(this.renderArtists)}
      </ul>
    );
  }
}

function mapStateToProps({ artists }) {
  return { artists };
}

export default connect(mapStateToProps)(Grid);
