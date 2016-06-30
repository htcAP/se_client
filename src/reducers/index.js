import { combineReducers } from 'redux';

import * as router from './routerReducer';

import * as sessionActions from './session/sessionActions';
import * as session from './session/sessionReducer';

import * as meetingActions from './meeting/meetingActions';
import * as meeting from './meeting/meetingReducer';

import * as userActions from './user/userActions';
import * as user from './user/userReducer';

export const rootReducer = combineReducers({
  router: router.reducer,
  session: session.reducer,
  meeting: meeting.reducer,
  user: user.reducer,
});

export const actions = {
  ...sessionActions,
  ...meetingActions,
  ...userActions,
};

export function getInitialState() {
  const state = {
    ...router.initialState,
    ...session.initialState,
    ...meeting.initialState,
    ...user.initialState,
  };
  return state;
}
