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

export default class ConferenceViewPage extends Component {

  cancelOperation = () => {
    Actions.pop();
  };

  viewAttendance = () => {
    Actions.viewAttendance();
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
            iconName="delete"
            onTouch={this.submitNewConference}
          />}
          title={
            <Text style={styles.title}>
            Daily Scrum Discuss
            </Text>
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
          <Text style={[theme.conferDetailContent, theme.conferDetailContentText]} >
            Whatever you like...
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
              <Text style={theme.conferDetailContentText}>
                2016 June 1st
              </Text>
              <Text style={theme.conferDetailContentText}>
                9:30 AM
              </Text>
            </View>
          </View>

          <View style={[theme.conferDetailIterm]}>
            <View style={theme.conferDetailIcon} />
            <View style={theme.conferDetailContent}>
              <Text style={theme.conferDetailContentText}>
                2016 June 1st
              </Text>
              <Text style={theme.conferDetailContentText}>
                10:30 AM
              </Text>
            </View>
          </View>
        </View>

        <View style={theme.conferDetailItermContainer}>
          <TouchableNativeFeedback delayPressIn={20}
            onPress={this.viewAttendance}
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
            onPress={this.viewAttendance}
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
    marginTop: 12,
    fontFamily: 'sans-serif-medium',
    fontSize: 16,
    color: theme.primaryTextColor,
  },
});
