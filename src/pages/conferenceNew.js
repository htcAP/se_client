import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableNativeFeedback,
} from 'react-native';
import {
  Actions,
} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/MaterialIcons';

import IconButton from '../components/iconButton';
import NavBar2 from '../components/navbar2';
import theme from '../lib/theme';
import texts from '../lib/texts';
import StatusBar from '../components/statusbar';

import {
  describeDate,
  describeTime,
  describeDuration,
} from '../lib/utils';


export default class ConferenceNewPage extends Component {

  constructor(props) {
    super(props);
    const now = new Date();
    this.state = {
      startAfter: now,
      endBefore: new Date(),
      duration: new Date(0),
    };

    this.state.endBefore.setHours(now.getHours() + 1);
    this.state.duration.setMinutes(30);

    console.log(this.state);
  }

  cancelOperation = () => {
    this._titleInput.blur();
    Actions.pop();
  };

  submitNewConference = () => {
    Actions.conferenceChoose();
  }

  selectImportantAttendance = () => {
    Actions.selectAttendance({
      title: texts.SelectImportantAttendance
    });
  }

  selectAttendance = () => {
    Actions.selectAttendance({
      title: texts.SelectAttendance
    });
  }

  render() {
    console.log(this.state);

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
              placeholder={texts.InputConferenceName}
              placeholderTextColor={theme.lightPrimaryTextColor}
              keyboardType="twitter"
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
            name="subject"
            size={24}
          />
          <TextInput style={[theme.conferDetailContent, theme.conferDetailContentText]}
            placeholder={texts.ConferenceContent}
            placeholderTextColor={theme.lightSecondaryTextColor}
            keyboardType="twitter"
            underlineColorAndroid="transparent"
            ref={(c) => this._titleInput = c}
          />
        </View>
        </View>

        <View style={theme.conferDetailItermContainer}>
          <View style={[theme.conferDetailIterm]}>
            <Icon style={theme.conferDetailIcon}
              name="query-builder"
              size={24}
            />
            <View style={theme.conferDetailContent}>
              <Text style={theme.conferDetailContentText}>
                { describeDate(this.state.startAfter) }
              </Text>
              <Text style={theme.conferDetailContentText}>
                { describeTime(this.state.startAfter) }
              </Text>
            </View>
          </View>

          <View style={[theme.conferDetailIterm]}>
            <View style={theme.conferDetailIcon} />
            <View style={theme.conferDetailContent}>
              <Text style={theme.conferDetailContentText}>
                { describeDate(this.state.endBefore) }
              </Text>
              <Text style={theme.conferDetailContentText}>
                { describeTime(this.state.endBefore) }
              </Text>
            </View>
          </View>

          <View style={[theme.conferDetailIterm]}>
            <View style={theme.conferDetailIcon} />
            <Text style={[theme.conferDetailContent, theme.conferDetailContentText]}>
              { describeDuration(this.state.duration) }
            </Text>
          </View>
        </View>

        <View style={theme.conferDetailItermContainer}>
          <TouchableNativeFeedback delayPressIn={20}
            onPress={this.selectImportantAttendance}
          >
          <View style={[theme.conferDetailIterm]}>
            <Icon style={theme.conferDetailIcon}
              name="people"
              size={24}
            />
            <View style={theme.conferDetailContent}>
              <Text style={theme.conferDetailContentText}>
                htc, tzy
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
              <Text style={theme.conferDetailContentText}>
                htc, tzy
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

const styles = StyleSheet.create({
  title: {
    marginTop: -12,
    fontFamily: 'sans-serif-medium',
    fontSize: 16,
    color: theme.primaryTextColor,
  },
});
