import React, { Component } from 'react';
import {
  Text,
  View,
} from 'react-native';

import NavBar from '../components/navbar';
import MenuButton from '../components/menuButton';

class ConferenceListPage extends Component {

  render() {

    return (
      <View>
        <NavBar
          leftNav={<MenuButton />}
        />
        <Text>
          =.=
        </Text>
      </View>
    );
  }
}

export default ConferenceListPage;
