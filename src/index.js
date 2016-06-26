import React, { Component } from 'react';
import {
  Actions,
  Scene,
  Router,
} from 'react-native-router-flux';

import LoginPage from './pages/login';
import ConferenceListPage from './pages/conferenceList';

export default class ConferenceApp extends Component {

  render() {
    const scenes = Actions.create(
      <Scene key="root">

        <Scene key="login"
          hideNavBar={true}
          component={LoginPage}
          initial={true}
        />

        <Scene key="conferenceList"
          component={ConferenceListPage}
        />

      </Scene>
    );

    return (
      <Router scenes={scenes} />
    );
  }

}
