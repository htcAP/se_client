import React, { Component } from 'react';

import IconButton from './iconButton';

export default class MenuButton extends Component {

  render() {
    return (
      <IconButton
        onTouch={this.toggleMenu}
        iconName="md-menu"
      />
    );
  }

}
