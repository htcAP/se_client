import React, { Component } from 'react';
import {
  Actions,
  Scene,
  Router,
} from 'react-native-router-flux';
import NavigationCardStackStyleInterpolator from 'NavigationCardStackStyleInterpolator';
import {
  connect,
  Provider,
} from 'react-redux';

import LoginPage from './pages/login';
import ConferenceListPage from './pages/conferenceList';
import ConferenceNewPage from './pages/conferenceNew';
import SelectAttendancePage from './pages/selectAttendance';
import ConferenceChoosePage from './pages/conferenceChoose';
import ConferenceViewPage from './pages/conferenceView';
import ViewAttendancePage from './pages/viewAttendance';

import configureStore from './lib/configureStore';
import { getInitialState } from './reducers';
import texts from './lib/texts';


export default class ConferenceApp extends Component {

  scenes = Actions.create(
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
        title={texts.ConferenceManagementSystem}
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

  render() {

    const store = configureStore(getInitialState());

    const RouterWithRedux = connect()(Router);

    return (
      <Provider store={store}>
        <RouterWithRedux scenes={this.scenes} />
      </Provider>
    );
  }

}
