import React, { Component } from 'react';
import {
  Text,
  View,
  DrawerLayoutAndroid,
  StyleSheet,
} from 'react-native';

import NavBar from '../components/navbar';
import IconButton from '../components/iconButton';

class ConferenceListPage extends Component {

  showDrawer = () => {
    return (
        <View style={styles.center}>
            <Text style={styles.center_title}>我是导航栏功能标题</Text>
            <Text style={styles.center_item}>1、功能1</Text>
            <Text style={styles.center_item}>2、功能2</Text>
        </View>
    );
  }

  openDrawer = () => {
    this._drawer.openDrawer();
    console.log('openDrawer');
  }

  render() {

    return (
        <DrawerLayoutAndroid
          ref={(c) => {this._drawer = c;}}
          drawerWidth={300}
          drawerPosition={DrawerLayoutAndroid.positions.Left}
          renderNavigationView={this.showDrawer}
        >
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

});
