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
import ConferenceChoosePage from './pages/conferenceChoose';
import ConferenceViewPage from './pages/conferenceView';
import ViewAttendancePage from './pages/viewAttendance';

export default class ConferenceApp extends Component {

  render() {
    const scenes = Actions.create(
      <Scene key="root"
        hideNavBar={true}
      >

        <Scene key="login"
          component={LoginPage}
          initial={true}
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
          getSceneStyle={NavigationCardStackStyleInterpolator.forVertical}
        />

        <Scene key="conferenceChoose"
          component={ConferenceChoosePage}
          getSceneStyle={NavigationCardStackStyleInterpolator.forVertical}
        />

        <Scene key="conferenceView"
          component={ConferenceViewPage}
          getSceneStyle={NavigationCardStackStyleInterpolator.forVertical}
        />

        <Scene key="viewAttendance"
          component={ViewAttendancePage}
          getSceneStyle={NavigationCardStackStyleInterpolator.forVertical}
        />

      </Scene>
    );

    return (
      <Router scenes={scenes} />
    );
  }

}
