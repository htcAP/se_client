
import {
  AppRegistry,
  UIManager,
  BackAndroid,
} from 'react-native';
import {
  Actions,
} from 'react-native-router-flux';

import confer_cli from './src';

UIManager.setLayoutAnimationEnabledExperimental &&   UIManager.setLayoutAnimationEnabledExperimental(true);

AppRegistry.registerComponent('confer_cli', () => confer_cli);

BackAndroid.addEventListener('hardwareBackPress', () => {
  Actions.pop();
  return true;
});
