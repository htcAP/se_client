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

import {
  connect,
} from 'react-redux';

import NavBar from '../components/navbar';
import IconButton from '../components/iconButton';
import StatusBar from '../components/statusbar';
import theme from '../lib/theme';

class SelectAttendancePage extends Component {

  constructor(props) {
    super(props);


    this.state = { };
    Object.keys(this.props.user.items).forEach((uid) => {
      this.state[uid] = {
        selected: false,
        disabled: false,
      };
    });

    this.props.selectedUsers.forEach((u) => {
      this.state[u.uid].selected = true;
    });

    this.props.disabledUsers.forEach((u) => {
      this.state[u.uid].disabled = true;
    });
  }

  cancelOperation = () => {
    Actions.pop();
  }

  submit = () => {
    this.props.setSelection([]);
    Actions.pop();
  }

  render() {

    let userList = Object.keys(this.state).forEach((uid) => {
      const u = this.state[uid];

      return (
        <View key={uid} style={styles.item}>
          <Image style={styles.itemAvatar}
            source={require('../res/avatar.jpg')}
          />
          <Text style={styles.itemText}>
            { this.props.user.items[uid].name }
          </Text>
          <MKCheckbox
            checked={u.checked}
            editable={u.disabled}
          />
        </View>
      );
    });

    return (
      <View>
        <StatusBar />
        <NavBar
          leftNav={ <IconButton
            iconName="clear"
            onTouch={this.cancelOperation}
          />}
          rightNav={<IconButton
            iconName="done"
            onTouch={this.submit}
          />}
        />
        <ScrollView>
          <View style={[theme.headerPadding]} />

          { userList }

          <View style={[theme.headerPadding]} />

        </ScrollView>
      </View>
    );
  }

}

export default connect(
  (({user}) => ({user}))
)(SelectAttendancePage);

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
