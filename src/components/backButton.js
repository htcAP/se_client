import React, { Component } from 'react';
import {
  Actions,
} from 'react-native-router-flux';

import IconButton from './iconButton';

export default class BackButton extends Component {

  render() {
    return (
      <IconButton
        onTouch={() => {
          Actions.pop();
        }}
        iconName="md-arrow-back"
      />
    );
  }
}

