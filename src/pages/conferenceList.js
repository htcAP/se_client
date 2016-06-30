import React, { Component } from 'react';
import {
  Text,
  View,
  DrawerLayoutAndroid,
  StyleSheet,
  Image,
  TouchableNativeFeedback,
  ScrollView,
  RefreshControl,
} from 'react-native';
import {
  MKButton
} from 'react-native-material-kit';
import {
  Actions
} from 'react-native-router-flux';
import {
  connect
} from 'react-redux';

import Icon from 'react-native-vector-icons/MaterialIcons';

import NavBar from '../components/navbar';
import IconButton from '../components/iconButton';
import StatusBar from '../components/statusbar';
import theme from '../lib/theme';
import texts from '../lib/texts';
import {
  toastError,
  describeDate,
  describeTime,
  userInList,
} from '../lib/utils';

import { actions } from '../reducers';

class ConferenceListPage extends Component {

  openDrawer = () => {
    this._drawer.openDrawer();
  }

  goNewConference = () => {
    Actions.conferenceNew();
  }

  viewConference = (mid) => {
    Actions.conferenceView({ mid });
  }

  logout = () => {
    Actions.login({
      type: 'reset',
    });
  }

  onRefresh = () => {
    if (this.props.meeting.listFetching) {
      return;
    }

    const { dispatch } = this.props;
    dispatch(actions.meetingFetchList())
    .catch(toastError);
  }

  renderDrawer = () => {

    return (
      <View style={theme.container}>
        <View style={styles.titleBar}>
          <View style={styles.avatarContainer}>
            <Image style={styles.avatar}
              source={require('../res/avatar.jpg')}
            />
          </View>
          <View style={styles.subtitle}>
            <Text style={[styles.titleText, {fontFamily: 'sans-serif-medium'}]}>
              { this.props.session.username }
            </Text>
            <Text style={styles.titleText}>
              { texts.RegularEmployee }
            </Text>
          </View>
        </View>

        <View style={styles.drawerContainer}>
          <TouchableNativeFeedback delayPressIn={20}
            onPress={this.logout}
          >
          <View style={styles.drawerItem}>
            <Icon
              name="exit-to-app"
              color={theme.secondaryTextColor}
              size={24}
              style={styles.drawerIcon}
            />
            <Text style={styles.drawerText}>
              { texts.Logout }
            </Text>
          </View>
          </TouchableNativeFeedback>
        </View>
      </View>
    );
  }

  ActionButton = MKButton.coloredFab()
    .withStyle(styles.actionButton)
    .withBackgroundColor(theme.secondaryColor)
    .withOnPress(this.goNewConference)
    .build();

  render() {
    const refreshing = this.props.meeting.listFetching || this.props.meeting.creating;

    let meetingList = Object.keys(this.props.meeting.items)
    .map(mid => this.props.meeting.items[mid]);
    meetingList.sort((m0, m1) => m1.start_time.getTime() - m0.start_time.getTime());
    meetingList = meetingList.map(m => {
      const uid = this.props.session.uid;
      console.log(m);
      const mustAttend = userInList(uid, m.required_users);
      const suggestAttend = userInList(uid, m.suggested_users);
      if (!mustAttend && !suggestAttend) {
        return null;
      }

      return (
        <TouchableNativeFeedback delayPressIn={20}
          onPress={() => this.viewConference(m.mid)}
          key={m.mid}
        >
        <View style={styles.conferItem}>
          <View style={styles.conferInfoContainer}>
            <Text style={styles.conferTitle} numberOfLines={1}>
              { m.title }
            </Text>
            <Text style={styles.conferTime} numberOfLines={1}>
              { describeDate(m.start_time) + '     ' + describeTime(m.start_time) }
            </Text>
            <Text style={styles.conferPlace} numberOfLines={1}>
              { m.room.name }
            </Text>
          </View>
          { mustAttend && <Icon
            style={styles.conferIcon}
            name="priority-high"
            color={theme.alertColor}
            size={20}
          /> }
        </View>
        </TouchableNativeFeedback>
      );
    });

    if (meetingList.length) {
      meetingList.unshift(
        <View key={-1} style={theme.headerPadding} />
      );
    } else if (!refreshing) {
      meetingList.push(
        <View key={-1} style={styles.blankContainer}>
          <Text style={styles.conferTitle} >
            {texts.NoConference}
          </Text>
        </View>
      );
    }

    return (
        <DrawerLayoutAndroid
          ref={(c) => this._drawer = c}
          drawerWidth={300}
          drawerPosition={DrawerLayoutAndroid.positions.Left}
          renderNavigationView={this.renderDrawer}
        >
          <StatusBar />

          <NavBar
            leftNav={<IconButton
              iconName="menu"
              onTouch={this.openDrawer}
            />}
          />

          <ScrollView
            refreshControl={ <RefreshControl
              refreshing={refreshing}
              onRefresh={this.onRefresh}
              colors={[theme.primaryColor, theme.secondaryColor]}
            />}
            style={[theme.page, theme.container]}
          >

            { meetingList }

          </ScrollView>
          <this.ActionButton>
            <Icon
              name="add"
              size={24}
              color={theme.primaryTextColor}
            />
          </this.ActionButton>
        </DrawerLayoutAndroid>
    );
  }
}

export default connect(
  ({ session, meeting }) => ({ session, meeting })
)(ConferenceListPage);

const styles = StyleSheet.create({
  titleBar: {
    paddingLeft: 16,
    paddingTop: 16 + 24,
    paddingBottom: 8,
    paddingRight: 16,
    backgroundColor: theme.secondaryColor,
  },

  titleText: {
    fontSize: 14,
    color: theme.primaryTextColor,
  },

  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
  },

  subtitle: {
    height: 56,
    justifyContent: 'center',
  },

  drawerContainer: {
    paddingTop: 8,
    backgroundColor: '#fff',
    flex: 1,
  },

  drawerItem: {
    height: 48,
    justifyContent: 'center',
  },

  drawerIcon: {
    position: 'absolute',
    left: 16,
    top: (48 - 24) / 2,
  },

  drawerText: {
    marginLeft: 72,
    fontSize: 14,
    fontFamily: 'sans-serif-medium',
    color: theme.secondaryTextColor,
  },

  conferItem: {
    height: 88,
    borderBottomWidth: 1,
    borderBottomColor: theme.dividerColor,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },

  conferInfoContainer: {
    marginLeft: 16,
    marginRight: 16,
  },

  conferTitle: {
    fontSize: 16,
    fontFamily: 'sans-serif-medium',
  },

  conferTime: {
    fontSize: 16,
  },

  conferPlace: {
    fontSize: 16,
  },

  conferIcon: {
    position: 'absolute',
    right: 16,
    top: 16,
  },

  actionButton: {
    position: 'absolute',
    right: 24,
    bottom: 24,
    width: 56,
    height: 56,
  },

  blankContainer: {
    height: 88,
    justifyContent: 'center',
    alignItems: 'center',
  }

});
