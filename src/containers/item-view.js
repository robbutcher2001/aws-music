import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchArtists } from '../actions/fetch-artists';

import Grid from './grid';

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

  render() {
    return (
      <div>
        <Grid />
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchArtists }, dispatch)
}

export default connect(null, mapDispatchToProps)(ItemView);
