import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  Image,
  TouchableNativeFeedback,
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

    this.state = this.calcState(props);
  }

  calcState(props) {
    let state = {};
    Object.keys(props.user.items).forEach((uid) => {
      state[uid] = {
        selected: false,
        disabled: false,
      };
    });

    props.selectedUsers.forEach((u) => {
      state[u.uid].selected = true;
    });

    props.disabledUsers.forEach((u) => {
      state[u.uid].disabled = true;
    });

    return state;
  }

  componentWillReceiveProps(props) {
    this.setState(this.calcState(props));
  }

  cancelOperation = () => {
    Actions.pop();
  }

  submit = () => {
    const ret = Object.keys(this.state)
      .filter(uid => this.state[uid].selected)
      .map(uid => this.props.user.items[uid]);
    this.props.setSelection(ret);

    Actions.pop();
  }

  selectUser = (uid, checked) => {
    if (this.state[uid].disabled) {
      return;
    }
    console.log(uid, checked);
    this.setState({
      [uid]: {
        ...this.state[uid],
        selected: checked,
      }
    });
  }

  render() {

    let userList = Object.keys(this.state).map((uid) => {
      const u = this.state[uid];

      return (
        <TouchableNativeFeedback delayPressIn={20}
          key={uid}
          onPress={() => this.selectUser(uid, !this.state[uid].selected)}
        >
        <View style={styles.item}>
          <Image style={styles.itemAvatar}
            source={require('../res/avatar.jpg')}
          />
          <Text style={styles.itemText}>
            { this.props.user.items[uid].username }
          </Text>
          { u.disabled || <MKCheckbox
            checked={u.selected}
            onCheckedChange={({checked}) => this.selectUser(uid, checked)}
          /> }
        </View>
        </TouchableNativeFeedback>
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
