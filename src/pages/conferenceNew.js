import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableNativeFeedback,
  DatePickerAndroid,
  TimePickerAndroid,
  Alert,
} from 'react-native';
import {
  Actions,
} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  connect,
} from 'react-redux';

import IconButton from '../components/iconButton';
import NavBar2 from '../components/navbar2';
import theme from '../lib/theme';
import texts from '../lib/texts';
import StatusBar from '../components/statusbar';
import {
  describeDate,
  describeTime,
  describeDuration,
  describeUserList,
  addDuration,
  minusDuration,
  toastError,
} from '../lib/utils';

import { actions } from '../reducers';


class ConferenceNewPage extends Component {

  constructor(props) {
    super(props);

    const uid = this.props.session.uid;
    const now = new Date();
    this.state = {
      startAfter: now,
      endBefore: new Date(),
      duration: new Date(0),
      mustAttendUsers: [ this.props.user.items[uid] ],
      suggestAttendUsers: [],
    };

    this.state.startAfter.setHours(now.getHours() + 1);
    this.state.endBefore.setHours(now.getHours() + 2);
    this.state.duration.setHours(0);
    this.state.duration.setMinutes(30);
  }

  cancelOperation = () => {
    this._titleInput.blur();
    Actions.pop();
  };

  confirmNewConference = (suggested) => {
    console.log(suggested);
  }

  requestSuggestion = () => {
    const { dispatch } = this.props;
    return dispatch(actions.meetingFetchSuggestion({
      range_start: this.state.startAfter.toGMTString(),
      range_end: this.state.endBefore.toGMTString(),
      duration: this.state.duration.getHours() * 60 + this.state.duration.getMinutes(),
      required_ids: this.state.mustAttendUsers.map(u => u.uid),

    })).catch(toastError);
  }

  submitNewConference = () => {
    // FIXME: avoid to use _lastNativeText
    const title = this._titleInput._lastNativeText || '';
    const note = this._noteInput._lastNativeText || '';

    if (title === '') {
      Alert.alert(
        texts.WrongInput,
        texts.PleaseInputTitle,
        [ { text: texts.OK, onPress: () => {
          this._titleInput.focus();
        } } ]
      );
      return;
    }
    if (note === '') {
      Alert.alert(
        texts.WrongInput,
        texts.PleaseInputNote,
        [ { text: texts.OK, onPress: () => {
          this._noteInput.focus();
        } } ]
      );
      return;
    }

    this.requestSuggestion();
    Actions.conferenceChoose({
      confirmNew: this.confirmNewConference,
      requestSuggestion: this.requestSuggestion,
    });
  }

  selectImportantAttendance = () => {
    Actions.selectAttendance({
      title: texts.SelectImportantAttendance,
      setSelection: mustAttendUsers => {
        this.setState({ mustAttendUsers });
      },
      selectedUsers: this.state.mustAttendUsers,
      disabledUsers: this.state.suggestAttendUsers
        .concat(this.props.user.items[this.props.session.uid]),
    });
  }

  selectAttendance = () => {
    Actions.selectAttendance({
      title: texts.SelectAttendance,
      setSelection: suggestAttendUsers => {
        this.setState({ suggestAttendUsers });
      },
      selectedUsers: this.state.suggestAttendUsers,
      disabledUsers: this.state.mustAttendUsers,
    });
  }

  adjustDate = (name, newVal) => {
    const state = { [name]: newVal };
    if (name !== 'duration' && newVal < new Date()) {
      Alert.alert(
        texts.WrongInput,
        texts.PleaseInputDateAfterNow,
        [ { text: texts.OK } ]
      );
      return {};
    }
    var est;
    switch (name) {
      case 'startAfter':
      est = addDuration(newVal, this.state.duration);
      if (est > this.state.endBefore) {
        state.endBefore = est;
      }
      break;

      case 'endBefore':
      est = minusDuration(newVal, this.state.duration);
      if (this.state.startAfter > est) {
        state.startAfter = est;
      }
      break;

      case 'duration':
      est = addDuration(this.state.startAfter, newVal);
      if (est > this.state.endBefore) {
        state.endBefore = est;
      }
      break;
    }

    return state;
  }

  setDate = (name) => {
    const date = new Date(this.state[name]);

    DatePickerAndroid.open({
      date

    }).then(({action, year, month, day}) => {
      if (action !== DatePickerAndroid.dateSetAction) {
        return;
      }
      date.setYear(year);
      date.setMonth(month);
      date.setDate(day);

      this.setState(this.adjustDate(name, date));
    });
  }

  setTime = (name) => {
    const date = new Date(this.state[name]);

    TimePickerAndroid.open({
      hour: date.getHours(),
      minute: date.getMinutes(),

    }).then(({action, hour, minute}) => {
      if (action !== TimePickerAndroid.timeSetAction) {
        return;
      }
      date.setHours(hour);
      date.setMinutes(minute);

      this.setState(this.adjustDate(name, date));
    });
  }

  render() {

    return (
      <View style={{backgroundColor: '#fff'}}>

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
            <TextInput style={styles.title}
              autoFocus={true}
              blurOnSubmit={true}
              placeholder={texts.InputConferenceName}
              placeholderTextColor={theme.lightPrimaryTextColor}
              keyboardType="twitter"
              retunKeyType="done"
              underlineColorAndroid="transparent"
              ref={(c) => this._titleInput = c}
            />
          }
        />

        <View style={theme.headerPadding} />

        <ScrollView>

        <View style={theme.conferDetailItermContainer}>
        <View style={theme.conferDetailIterm}>
          <Icon style={theme.conferDetailIcon}
            name="subject" size={24}
          />
          <TextInput style={[theme.conferDetailContent, theme.conferDetailContentText]}
            blurOnSubmit={true}
            placeholder={texts.ConferenceContent}
            placeholderTextColor={theme.lightSecondaryTextColor}
            keyboardType="twitter"
            retunKeyType="done"
            underlineColorAndroid="transparent"
            ref={(c) => this._noteInput = c}
          />
        </View>
        </View>

        <View style={theme.conferDetailItermContainer}>
          <View style={[theme.conferDetailIterm]}>
            <Icon style={theme.conferDetailIcon}
              name="query-builder" size={24}
            />
            <View style={theme.conferDetailContent}>
              <TouchableNativeFeedback delayPressIn={20}
                onPress={() => this.setDate('startAfter')}
              >
              <View style={[theme.conferDetailContentTextContainer, {flex: 1}]}>
                <Text style={theme.conferDetailContentText}>
                  { describeDate(this.state.startAfter) }
                </Text>
              </View>
              </TouchableNativeFeedback>

              <TouchableNativeFeedback delayPressIn={20}
                onPress={() => this.setTime('startAfter')}
              >
              <View style={theme.conferDetailContentTextContainer}>
                <Text style={theme.conferDetailContentText}>
                  { describeTime(this.state.startAfter) }
                </Text>
              </View>
              </TouchableNativeFeedback>
            </View>
          </View>

          <View style={[theme.conferDetailIterm]}>
            <View style={theme.conferDetailIcon} />
            <View style={theme.conferDetailContent}>
              <TouchableNativeFeedback delayPressIn={20}
                onPress={() => this.setDate('endBefore')}
              >
              <View style={[theme.conferDetailContentTextContainer, {flex: 1}]}>
              <Text style={theme.conferDetailContentText}>
                { describeDate(this.state.endBefore) }
              </Text>
              </View></TouchableNativeFeedback>

              <TouchableNativeFeedback delayPressIn={20}
                onPress={() => this.setTime('endBefore')}
              >
              <View style={theme.conferDetailContentTextContainer}>
              <Text style={theme.conferDetailContentText}>
                { describeTime(this.state.endBefore) }
              </Text>
              </View>
              </TouchableNativeFeedback>
            </View>
          </View>

          <TouchableNativeFeedback delayPressIn={20}
            onPress={()=> this.setTime('duration')}
          >
          <View style={[theme.conferDetailIterm]}>
            <View style={theme.conferDetailIcon} />
            <Text style={[theme.conferDetailContent, theme.conferDetailContentText]}>
              { describeDuration(this.state.duration) }
            </Text>
          </View>
          </TouchableNativeFeedback>
        </View>

        <View style={theme.conferDetailItermContainer}>
          <TouchableNativeFeedback delayPressIn={20}
            onPress={this.selectImportantAttendance}
          >
          <View style={[theme.conferDetailIterm]}>
            <Icon style={theme.conferDetailIcon}
              name="people" size={24}
            />
            <View style={theme.conferDetailContent}>
              <Text style={[theme.conferDetailContentText, {flex: 1}]}>
                { describeUserList(this.state.mustAttendUsers) }
              </Text>
              <Text style={theme.conferDetailContentText}>
                { texts.MustAttend }
              </Text>
            </View>
          </View>
          </TouchableNativeFeedback>

          <TouchableNativeFeedback delayPressIn={20}
            onPress={this.selectAttendance}
          >
          <View style={[theme.conferDetailIterm]}>
            <View style={theme.conferDetailIcon} />
            <View style={theme.conferDetailContent}>
              <Text style={[theme.conferDetailContentText, {flex: 1}]}>
                { describeUserList(this.state.suggestAttendUsers) }
              </Text>
              <Text style={theme.conferDetailContentText}>
                { texts.SuggestAttend }
              </Text>
            </View>
          </View>
          </TouchableNativeFeedback>
        </View>

        </ScrollView>

      </View>
    );

  }

}

export default connect(
  (({session, user}) => ({session, user}))
)(ConferenceNewPage);

const styles = StyleSheet.create({
  title: {
    marginTop: -12,
    fontFamily: 'sans-serif-medium',
    fontSize: 16,
    color: theme.primaryTextColor,
  },
});
