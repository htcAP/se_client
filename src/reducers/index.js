import { combineReducers } from 'redux';
import routerReducer from './routerReducer';
import * as sessionActions from './session/sessionActions';
import sessionReducer from './session/sessionReducer';

export const rootReducer = combineReducers({
  routerReducer,
  sessionReducer,
});

export const actions = {
  ...sessionActions,
};

export function getInitialState() {
  const state = {
    ...sessionReducer.initialState,
  };
  return state;
}
