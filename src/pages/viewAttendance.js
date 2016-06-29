import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  Image,
} from 'react-native';
import {
  MKCheckbox,
} from 'react-native-material-kit';
import {
  Actions,
} from 'react-native-router-flux';

import NavBar from '../components/navbar';
import IconButton from '../components/iconButton';
import StatusBar from '../components/statusbar';
import texts from '../lib/texts';
import theme from '../lib/theme';

export default class ViewAttendancePage extends Component {

  cancelOperation = () => {
    Actions.pop();
  }

  render() {
    return (
      <View>
        <StatusBar />
        <NavBar leftNav={ <IconButton
            iconName="clear"
            onTouch={this.cancelOperation}
          />}
        />
        <ScrollView>
          <View style={[theme.headerPadding]} />

          <View style={styles.item}>
            <Image style={styles.itemAvatar}
              source={require('../res/avatar.jpg')}
            />
            <Text style={styles.itemText}>
            htc
            </Text>
          </View>

          <View style={styles.item}>
            <Image style={styles.itemAvatar}
              source={require('../res/avatar.jpg')}
            />
            <Text style={styles.itemText}>
            htc
            </Text>
          </View>

          <View style={styles.item}>
            <Image style={styles.itemAvatar}
              source={require('../res/avatar.jpg')}
            />
            <Text style={styles.itemText}>
            htc
            </Text>
          </View>

          <View style={[theme.headerPadding]} />

        </ScrollView>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  item: {
    height: 56,
    paddingLeft: 16,
    paddingRight: 16,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
  },

  itemAvatar: {
    height: 40,
    width: 40,
    borderRadius: 20,
    marginRight: 16,
  },

  itemText: {
    flex: 1,
    fontSize: 16,
  }
});
