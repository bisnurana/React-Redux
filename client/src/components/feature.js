import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';

class Feature extends Component {
  componentWillMount() {
    this.props.fetchMessage();
  }
  render() {
    return <div>Feature component</div>;
  }
}
export default connect(null, actions)(Feature);
