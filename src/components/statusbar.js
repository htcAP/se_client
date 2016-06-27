import React, { Component } from 'react';
import {
  StatusBar,
} from 'react-native';

import theme from '../lib/theme';


export default class extends Component {

  render() {
    return (
      <StatusBar
        backgroundColor={theme.statusBarColor}
        translucent={true}
      />
    );
  }
}

