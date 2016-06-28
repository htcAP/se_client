import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Keyboard,
} from 'react-native';
import {
  MKTextField,
  MKButton,
} from 'react-native-material-kit';
import {
  Actions,
} from 'react-native-router-flux';

import theme from '../lib/theme';
import texts from '../lib/texts';
import StatusBar from '../components/statusbar';


export default class LoginPage extends Component {

  doLogin = () => {
    this._usernameInput.blur();
    this._passwordInput.blur();
    setTimeout(() => {
      Actions.conferenceList();
    }, 500);
  }


  UsernameInput = MKTextField.textfield()
    .withPlaceholder(texts.Username)
    .withStyle(styles.input)
    .withOnSubmitEditing(() => {
      this._usernameInput.blur();
      this._passwordInput.focus();
    })
    .build();

  PasswordInput = MKTextField.textfield()
    .withPlaceholder(texts.Password)
    .withStyle(styles.input)
    .withPassword(true)
    .withOnSubmitEditing(this.doLogin)
    .build();

  LoginButton = MKButton.coloredButton()
    .withText(texts.Login)
    .withStyle(styles.input)
    .withOnPress(this.doLogin)
    .build();

  render() {

    return (
        <View style={[styles.wrapper, theme.page]}>
          <StatusBar />
          <View style={[theme.cardStyle, styles.container]}>
            <View style={styles.header}>
              <Text style={styles.headerText}>
                {texts.ConferenceManagementSystem}
              </Text>
            </View>
            <View style={styles.wrapper}>
            <View style={styles.content}>
              <this.UsernameInput ref={(c) => {this._usernameInput = c;}} />
              <this.PasswordInput ref={(c) => {this._passwordInput = c;}} />
              <this.LoginButton ref={(c) => {this._loginButton = c;}} />
            </View>
            </View>
        </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 35,
    marginRight: 35,
    height: 320,
  },

  header: {
    height: 72,
    justifyContent: 'center',
    elevation: 4,
    margin: -2,
    backgroundColor: theme.primaryColor,
  },

  headerText: {
    marginLeft: 24,
    fontSize: 20,
    color: 'white',
  },

  wrapper: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },

  content: {
    margin: 8,
    paddingTop: 8
  },

  input: {
    margin: 16,
  },

});
