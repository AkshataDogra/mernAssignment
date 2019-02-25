import React, { Component } from 'react';

export default class Options extends Component {
    // constructor(props) {
    //   super(props);
    // }
    render() {
      return <option value={this.props.value}>{this.props.value}</option>;
    }
  }