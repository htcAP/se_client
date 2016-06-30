import { genActionConstants } from '../../lib/utils';
import api from '../api';

export const session = genActionConstants('SESSION_', [
  'LOGIN_REQUEST',
  'LOGIN_SUCCESS',
  'LOGIN_FAILED',
]);

export function login(username, password) {
  return dispatch => {
    dispatch({
      type: session.LOGIN_REQUEST
    });

    return api.post('/sessions', {
      username, password

    }).then(result => {
      dispatch({
        type: session.LOGIN_SUCCESS,
        uid: result.uid,
        username,
      });

    }).catch(reason => {
      dispatch({
        type: session.LOGIN_FAILED,
        reason,
      });
      throw reason;
    });
  };
}
