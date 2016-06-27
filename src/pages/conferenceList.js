import React, { Component } from 'react';
import {
  Text,
  View,
  DrawerLayoutAndroid,
  StyleSheet,
  Image,
  TouchableNativeFeedback,
} from 'react-native';

import Ripple from 'react-native-material-kit/lib/mdl/Ripple';
import Icon from 'react-native-vector-icons/Ionicons';

import NavBar from '../components/navbar';
import IconButton from '../components/iconButton';
import StatusBar from '../components/statusbar';
import theme from '../lib/theme';
import texts from '../lib/texts';

class ConferenceListPage extends Component {

  openDrawer = () => {
    this._drawer.openDrawer();
  }

  renderDrawer = () => {

    return (
      <View style={theme.container}>
        <View style={styles.titleBar}>
          <View style={styles.avatarContainer}>
            <Image
              style={styles.avatar}
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

        <View>
          <TouchableNativeFeedback>
          <View style={styles.drawerItem}>
            <Icon
              name="md-exit"
              color={theme.lightSecondaryTextColor}
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
              iconName="md-menu"
              onTouch={this.openDrawer}
            />}
          />
          <Text>
            =.=
          </Text>
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
    color: theme.secondaryTextColor,
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
    color: theme.lightSecondaryTextColor,
  }
});
