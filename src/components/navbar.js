import React, { Component } from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import theme from '../lib/theme';

export default class NavBar extends Component {

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.leftNav}>
          { this.props.leftNav }
        </View>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    height: 56,
    elevation: 4,
    backgroundColor: theme.primaryColor,
  },

  leftNav: {

  },
});
