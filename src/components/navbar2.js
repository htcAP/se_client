import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import theme from '../lib/theme';

export default class NavBar2 extends Component {

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.subContainer}>
          <View style={styles.leftNav}>
            { this.props.leftNav }
          </View>
          <View style={styles.rightNav}>
            { this.props.rightNav }
          </View>
        </View>
        <View style={[styles.title]}>
          { this.props.title }
        </View>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    paddingTop: 24,
    height: 48 + 56 + 24,
    elevation: 4,
    backgroundColor: theme.primaryColor,
  },

  subContainer: {
    height: 56,
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
    marginLeft: 16,
    marginRight: 16,
    height: 48,
    justifyContent: 'flex-start',
  },

});
