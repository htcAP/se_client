import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableNativeFeedback,
  RefreshControl,
} from 'react-native';
import {
  Actions,
} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  connect
} from 'react-redux';

import IconButton from '../components/iconButton';
import NavBar2 from '../components/navbar2';
import theme from '../lib/theme';
import texts from '../lib/texts';
import StatusBar from '../components/statusbar';

import { actions } from '../reducers';

import {
  describeDate,
  describeTime,
  describeUserList,
  toastError,
} from '../lib/utils';

class ConferenceViewPage extends Component {

  cancelOperation = () => {
    Actions.pop();
  };

  viewImportantAttendance = () => {
    Actions.viewAttendance({
      title: texts.ImportantAttendance
    });
  }

  viewAttendance = () => {
    Actions.viewAttendance({
      title: texts.Attendance
    });
  }

  deleteConference = () => {
    const { dispatch } = this.props;
    dispatch(actions.meetingDelete(this.props.mid))
    .then(() => {
      Actions.pop();

    }).catch(toastError);
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    const mid = this.props.mid;
    const m = this.props.meeting.items[mid];

    return (
      <View style={{backgroundColor: '#fff'}}>
        <StatusBar />
        <NavBar2
          leftNav={<IconButton
            iconName="clear"
            onTouch={this.cancelOperation}
          />}
          rightNav={<IconButton
            iconName="delete"
            onTouch={this.deleteConference}
          />}
          title={
            <Text style={styles.title}>
              { m.title }
            </Text>
          }
        />

        <View style={theme.headerPadding} />

        <ScrollView
          refreshControl={ <RefreshControl
            refreshing={ !!(m.deleting || m.refreshing) }
            onRefresh={this.onRefresh}
            colors={[theme.primaryColor, theme.secondaryColor]}
          />}
        >

        <View style={theme.conferDetailItermContainer}>
        <View style={theme.conferDetailIterm}>
          <Icon style={theme.conferDetailIcon}
            name="subject"
            size={24}
          />
          <Text style={[theme.conferDetailContent, theme.conferDetailContentText]} >
            { m.note }
          </Text>
        </View>
        </View>

        <View style={theme.conferDetailItermContainer}>
          <View style={[theme.conferDetailIterm]}>
            <Icon style={theme.conferDetailIcon}
              name="query-builder"
              size={24}
            />
            <View style={theme.conferDetailContent}>
              <Text style={[theme.conferDetailContentText, {flex: 1}]}>
                { describeDate(m.start_time) }
              </Text>
              <Text style={theme.conferDetailContentText}>
                { describeTime(m.start_time) }
              </Text>
            </View>
          </View>

          <View style={[theme.conferDetailIterm]}>
            <View style={theme.conferDetailIcon} />
            <View style={theme.conferDetailContent}>
              <Text style={[theme.conferDetailContentText, {flex: 1}]}>
                { describeDate(m.end_time) }
              </Text>
              <Text style={theme.conferDetailContentText}>
                { describeTime(m.end_time) }
              </Text>
            </View>
          </View>
        </View>

        <View style={theme.conferDetailItermContainer}>
          <TouchableNativeFeedback delayPressIn={20}
            onPress={this.viewImportantAttendance}
          >
          <View style={[theme.conferDetailIterm]}>
            <Icon style={theme.conferDetailIcon}
              name="people"
              size={24}
            />
            <View style={theme.conferDetailContent}>
              <Text style={[theme.conferDetailContentText, {flex: 1}]}>
                { describeUserList(m.required_users) }
              </Text>
              <Text style={theme.conferDetailContentText}>
                { texts.MustAttend }
              </Text>
            </View>
          </View>
          </TouchableNativeFeedback>

          <TouchableNativeFeedback delayPressIn={20}
            onPress={this.viewAttendance}
          >
          <View style={[theme.conferDetailIterm]}>
            <View style={theme.conferDetailIcon} />
            <View style={theme.conferDetailContent}>
              <Text style={[theme.conferDetailContentText, {flex: 1}]}>
                { describeUserList(m.suggested_users) }
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
  (({meeting}) => ({meeting}))
)(ConferenceViewPage);

const styles = StyleSheet.create({
  title: {
    marginTop: 12,
    fontFamily: 'sans-serif-medium',
    fontSize: 16,
    color: theme.primaryTextColor,
  },
});
