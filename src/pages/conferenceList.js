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

import Icon from 'react-native-vector-icons/MaterialIcons';

import NavBar from '../components/navbar';
import IconButton from '../components/iconButton';
import StatusBar from '../components/statusbar';
import theme from '../lib/theme';
import texts from '../lib/texts';

class ConferenceListPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isRefreshing: false,
      loaded: 0,
    };
  }

  openDrawer = () => {
    this._drawer.openDrawer();
  }

  goNewConference = () => {
    Actions.conferenceNew();
  }

  onRefresh = () => {
    this.setState({isRefreshing: true});
    setTimeout(() => {
      this.setState({
        loaded: this.state.loaded + 10,
        isRefreshing: false,
      });
    }, 2000);
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
              htc
            </Text>
            <Text style={styles.titleText}>
              Regular Employee
            </Text>
          </View>
        </View>

        <View style={styles.drawerContainer}>
          <TouchableNativeFeedback delayPressIn={20}>
          <View style={styles.drawerItem}>
            <Icon
              name="exit-to-app"
              color={theme.secondaryTextColor}
              size={24}
              style={styles.drawerIcon}
            />
            <Text style={styles.drawerText}>
              {texts.Logout}
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
            title={texts.ConferenceManagementSystem}
          />

          <ScrollView
            refreshControl={ <RefreshControl
              refreshing={this.state.isRefreshing}
              onRefresh={this.onRefresh}
              colors={[theme.primaryColor, theme.secondaryColor]}
            />}
          >
            <View style={{paddingTop: 8}}/>

            <TouchableNativeFeedback delayPressIn={20}>
            <View style={styles.conferItem}>
              <View style={styles.conferInfoContainer}>
                <Text style={styles.conferTitle} numberOfLines={1}>
                  Daily Scrum Discussion
                </Text>
                <Text style={styles.conferTime} numberOfLines={1}>
                  Tomorrow 9:15 AM
                </Text>
                <Text style={styles.conferPlace} numberOfLines={1}>
                  10F open space
                </Text>
              </View>
              <Icon
                style={styles.conferIcon}
                name="priority-high"
                color={theme.alertColor}
                size={20}
              />
            </View>
            </TouchableNativeFeedback>

            <TouchableNativeFeedback delayPressIn={20}>
            <View style={styles.conferItem}>
              <View style={styles.conferInfoContainer}>
                <Text style={styles.conferTitle} numberOfLines={1}>
                  Daily Scrum Discussion
                </Text>
                <Text style={styles.conferTime} numberOfLines={1}>
                  Tomorrow 9:15 AM
                </Text>
                <Text style={styles.conferPlace} numberOfLines={1}>
                  10F open space and long text aaaaaaaaaaaaaaabbbbbbbbbbbbbbbbbbbbb
                </Text>
              </View>
            </View>
            </TouchableNativeFeedback>

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

export default ConferenceListPage;

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

});
