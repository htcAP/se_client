import React, { Component } from 'react';
import {
  Actions,
  Scene,
  Router,
} from 'react-native-router-flux';
import NavigationCardStackStyleInterpolator from 'NavigationCardStackStyleInterpolator';


import LoginPage from './pages/login';
import ConferenceListPage from './pages/conferenceList';
import ConferenceNewPage from './pages/conferenceNew';
import SelectAttendancePage from './pages/selectAttendance';

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
          getSceneStyle={NavigationCardStackStyleInterpolator.forVertical}
        />

        <Scene key="conferenceNew"
          component={ConferenceNewPage}
          getSceneStyle={NavigationCardStackStyleInterpolator.forVertical}
        />

        <Scene key="selectAttendance"
          component={SelectAttendancePage}
          initial={true}
          getSceneStyle={NavigationCardStackStyleInterpolator.forVertical}
        />

      </Scene>
    );

    return (
      <Router scenes={scenes} />
    );
  }

}
