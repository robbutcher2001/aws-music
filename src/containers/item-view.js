import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchArtists } from '../actions/fetch-artists';

export class ItemView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      gridTitle: 'Artists',
      gridHeading: 'Hold up Rib, loading..',
      gridData: []
    }

    this.props.fetchArtists('artists', 'Blah?');
  }

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

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchArtists }, dispatch)
}

function mapStateToProps({ artists }) {
  return { artists };
}

export default connect(null, mapDispatchToProps)(ItemView);
