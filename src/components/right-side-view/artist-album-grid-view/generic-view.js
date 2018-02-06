import React, { Component } from 'react';

import Grid from './grid';

export default class GenericView extends Component {
  constructor(props) {
    super(props);
  }

  fetchGridData(api, successRspText) {
    fetch(`${__API_BASE__}/${api}`)
      .then(response => {
        response.json().then(responseJson => {
          this.setState({
            gridHeading: successRspText,
            gridData: responseJson.data
          });
        })
        .catch(err => this.handleError(err));
      })
      .catch(err => this.handleError(err));
  }

  handleError(err) {
    this.setState({
      gridHeading: 'Fetch went wrong, items cannot be loaded',
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
