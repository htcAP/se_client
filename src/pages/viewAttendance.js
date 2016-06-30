import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  Image,
} from 'react-native';
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
    let userList = this.props.users.map(u => (
      <View key={u.uid} style={styles.item}>
        <Image style={styles.itemAvatar}
          source={require('../res/avatar.jpg')}
        />
        <Text style={styles.itemText}>
          { u.username }
        </Text>
      </View>
    ));
    if (userList.length) {
      userList.unshift(
        <View key={-1} style={theme.headerPadding} />
      );
      userList.push(
        <View key={-2} style={theme.headerPadding} />
      );
    } else {
      userList.push(
        <View key={-1} style={styles.blankPageContainer}>
          <Text> { texts.NoPeople } </Text>
        </View>
      );
    }

    return (
      <View>
        <StatusBar />
        <NavBar leftNav={ <IconButton
            iconName="clear"
            onTouch={this.cancelOperation}
          />}
        />
        <ScrollView>

        { userList }

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
  },

  blankPageContainer: {
    height: 88,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
