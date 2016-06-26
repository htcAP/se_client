import React, { Component } from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';

export default class NavBar extends Component {

  render() {
    return (
      <View style={styles.container}>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    height: 56,
    elevation: 4,
  }
});
