import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';

import Ripple from 'react-native-material-kit/lib/mdl/Ripple';
import Icon from 'react-native-vector-icons/Ionicons';

import theme from '../lib/theme';

export default class IconButton extends Component {

  onTouch = (e) => {
    if (e.type === 'TOUCH_UP') {
      this.props.onTouch();
    }
  }

  render() {
    return (
      <TouchableWithoutFeedback>
      <Ripple
        style={styles.iconButtonRipple}
        rippleColor="rgba(255,255,255,.27)"
        maskBorderRadiusInPercent={50}
        rippleLocation="center"
        pointerEvents="box-only"
        onTouch={this.onTouch}
      >
        <Icon
          name={this.props.iconName}
          color={theme.white}
          size={24}
          style={styles.iconButton}
        />
      </Ripple>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  iconButtonRipple: {
    width: 56,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: theme.white,
  },

  iconButton: {
  }
});
