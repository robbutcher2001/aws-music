import React, { Component } from 'react';
import { connect } from 'react-redux';

export class ItemView extends Component {
  renderArtists(artistsData) {
    artistsData.map(artistData => {
      return (
        <li>{artistData.name}</li>
      );
    });
  }

  render() {
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

export default connect(mapStateToProps)(ItemView);
