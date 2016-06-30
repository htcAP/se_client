import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';
import {
  MKTextField,
  MKButton,
} from 'react-native-material-kit';
import {
  Actions,
} from 'react-native-router-flux';
import {
  connect
} from 'react-redux';

import theme from '../lib/theme';
import texts from '../lib/texts';
import { toastError } from '../lib/utils';
import StatusBar from '../components/statusbar';

import { actions } from '../reducers';


class LoginPage extends Component {

  doLogin = () => {
    if (this.props.session.loggingIn) {
      return;
    }

    const { dispatch } = this.props;

    this._usernameInput.blur();
    this._passwordInput.blur();
    const username = this._usernameInput.bufferedValue;
    const password = this._passwordInput.bufferedValue;

    dispatch(actions.login(
      username, password
      // 'htc', '3.14159'

    )).then(() => {
      Actions.conferenceList({ type: 'reset' });
      dispatch(actions.meetingFetchList())
      .catch(toastError);
      dispatch(actions.userFetchList())
      .catch(toastError);

    }).catch(reason => {
      ToastAndroid.show(reason.message, ToastAndroid.SHORT);
    });
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
            <this.UsernameInput ref={(c) => this._usernameInput = c} />
            <this.PasswordInput ref={(c) => this._passwordInput = c} />
            <ActivityIndicator
              animating={this.props.session.loggingIn}
            />
            <this.LoginButton ref={(c) => this._loginButton = c} />
          </View>
          </View>
      </View>
      </View>
    );
  }
}

export default connect(
  (({session}) => ({session}))
)(LoginPage);


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
