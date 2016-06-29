import { genActionConstants } from '../../lib/utils';
import api from '../api';

export const session = genActionConstants('SESSION_', [
  'LOGIN_REQUEST',
  'LOGIN_SUCCESS',
  'LOGIN_FAILED',
]);

export function login(username, password) {
  return dispatch => {
    dispatch(loginRequest());

    return api.post('/sessions', {
      username, password

    }).then(result => {
        dispatch(loginSuccess(result.uid, username));

    }).catch(e => {
      dispatch(loginFailed(e));
      throw e;

    });
  };
}

export function loginRequest() {
  return {
    type: session.LOGIN_REQUEST
  };
}

export function loginFailed(reason) {
  return {
    type: session.LOGIN_FAILED,
    reason
  };
}

export function loginSuccess(uid, username) {
  return {
    type: session.LOGIN_SUCCESS,
    uid, username,
  };
}
