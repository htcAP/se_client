import { genActionConstants } from '../../lib/utils';
import api from '../api';

export const user = genActionConstants('USER_', [
  'LIST_FETCH_REQUEST',
  'LIST_FETCH_SUCCESS',
  'LIST_FETCH_FAILED',
]);

export function userFetchList() {
  return dispatch => {
    dispatch({
      type: user.LIST_FETCH_REQUEST,
    });

    return api.get('/users')
    .then(({users}) => {
      dispatch({
        type: user.LIST_FETCH_SUCCESS,
        users,
      });
      return users;

    }).catch(reason => {
      dispatch({
        type: user.LIST_FETCH_FAILED,
        reason,
      });
      throw reason;
    });
  };
}
