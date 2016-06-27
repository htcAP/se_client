
import React from 'react';
import {
  AppRegistry,
  UIManager,
  BackAndroid,
  View,
  StatusBar,
} from 'react-native';
import {
  Actions,
} from 'react-native-router-flux';

import App from './src';

UIManager.setLayoutAnimationEnabledExperimental &&   UIManager.setLayoutAnimationEnabledExperimental(true);

AppRegistry.registerComponent('confer_cli', () => App);

BackAndroid.addEventListener('hardwareBackPress', () => {
  Actions.pop();
  return true;
});

