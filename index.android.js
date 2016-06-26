
import {
  AppRegistry,
  UIManager,
} from 'react-native';

import confer_cli from './src';

UIManager.setLayoutAnimationEnabledExperimental &&   UIManager.setLayoutAnimationEnabledExperimental(true);

AppRegistry.registerComponent('confer_cli', () => confer_cli);
