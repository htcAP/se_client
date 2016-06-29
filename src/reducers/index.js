import { combineReducers } from 'redux';
import * as sessionActions from './session/sessionActions';
import * as router from './routerReducer';
import * as session from './session/sessionReducer';

export const rootReducer = combineReducers({
  router: router.reducer,
  session: session.reducer,
});

export const actions = {
  ...sessionActions,
};

export function getInitialState() {
  const state = {
    ...session.initialState,
    ...router.initialState,
  };
  return state;
}
