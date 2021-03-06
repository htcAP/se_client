import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';

import theme from '../lib/theme';

class NavBar extends Component {

  render() {

    return (
      <View style={styles.container}>
        <View style={styles.leftNav}>
          { this.props.leftNav }
        </View>
        <View style={styles.title}>
          <Text style={styles.titleText}>
            { this.props.scene.title }
          </Text>
        </View>
        <View style={styles.rightNav}>
          { this.props.rightNav }
        </View>
      </View>
    );
  }

}

export default connect(
  (state) => {
    return { scene: state.router.scene };
  }
)(NavBar);

const styles = StyleSheet.create({
  container: {
    paddingTop: 24,
    height: 56 + 24,
    elevation: 4,
    backgroundColor: theme.primaryColor,
    justifyContent: 'center',
  },

  leftNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
  },

  rightNav: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },

  title: {
    marginLeft: 72,
  },

  titleText: {
    color: theme.primaryTextColor,
    fontFamily: 'sans-serf-medium',
    fontSize: 16,
  },
});
