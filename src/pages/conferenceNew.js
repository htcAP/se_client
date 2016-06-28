import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
} from 'react-native';
import {
  Actions,
} from 'react-native-router-flux';

import IconButton from '../components/iconButton';
import NavBar2 from '../components/navbar2';
import theme from '../lib/theme';
import texts from '../lib/texts';
import StatusBar from '../components/statusbar';

export default class ConferenceNewPage extends Component {

  cancelOperation = () => {
    Actions.pop();
  };

  submitNewConference = () => {
  }

  render() {
    return (
      <View>
        <StatusBar />
        <NavBar2
          leftNav={<IconButton
            iconName="clear"
            onTouch={this.cancelOperation}
          />}
          rightNav={<IconButton
            iconName="done"
            onTouch={this.submitNewConference}
          />}
          title={
            <TextInput
              style={styles.title}
              autoFocus={true}
              placeholder={texts.InputConferenceName}
              placeholderTextColor={theme.lightPrimaryTextColor}
              keyboardType="twitter"
              underlineColorAndroid="transparent"
            />
          }
        />
      </View>
    );

  }

}

const styles = StyleSheet.create({
  title: {
    marginTop: -12,
    fontFamily: 'sans-serf-medium',
    fontSize: 16,
    color: theme.primaryTextColor,
  }
});
