import React, { Component } from 'react';
import {
  StatusBar,
} from 'react-native';
import {
  Actions,
  Scene,
  Router,
} from 'react-native-router-flux';
import NavigationCardStackStyleInterpolator from 'NavigationCardStackStyleInterpolator';


import LoginPage from './pages/login';
import ConferenceListPage from './pages/conferenceList';
import ConferenceNewPage from './pages/conferenceNew';

export default class ConferenceApp extends Component {

  render() {
    const scenes = Actions.create(
      <Scene key="root"
        hideNavBar={true}
      >

        <Scene key="login"
          component={LoginPage}
          getSceneStyle={NavigationCardStackStyleInterpolator.forVertical}
        />

        <Scene key="conferenceList"
          component={ConferenceListPage}
          initial={true}
          getSceneStyle={NavigationCardStackStyleInterpolator.forVertical}
        />

        <Scene key="conferenceNew"
          component={ConferenceNewPage}
          getSceneStyle={NavigationCardStackStyleInterpolator.forVertical}
        />

      </Scene>
    );

    return (
      <Router scenes={scenes} />
    );
  }

}
