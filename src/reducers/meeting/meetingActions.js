import { genActionConstants } from '../../lib/utils';
import api from '../api';

export const meeting = genActionConstants('MEETING_', [
  'LIST_FETCH_REQUEST',
  'LIST_FETCH_SUCCESS',
  'LIST_FETCH_FAILED',

  'DELETE_REQUEST',
  'DELETE_SUCCESS',
  'DELETE_FAILED',

  'FETCH_REQUEST',
  'FETCH_SUCCESS',
  'FETCH_FAILED',

  'CREATE_REQUEST',
  'CREATE_SUCCESS',
  'CREATE_FAILED',

  'SUGGESTION_REQUEST',
  'SUGGESTION_SUCCESS',
  'SUGGESTION_FAILED',
]);

export function meetingFetchSuggestion({
  range_start,
  range_end,
  duration,
  required_ids,
}) {
  return dispatch => {
    dispatch({
      type: meeting.SUGGESTION_REQUEST,
    });

    return api.post('/meetings/suggestions', {
      range_start,
      range_end,
      duration,
      required_ids,

    }).then(({suggestions}) => {
      dispatch({
        type: meeting.SUGGESTION_FETCH_SUCCESS,
        suggestions,
      });
      return suggestions;

    }).catch(reason => {
      dispatch({
        type: meeting.SUGGESTIONG_FETCH_FAILED,
        reason,
      });
      throw reason;

    });
  };
}

export function meetingFetchList() {
  return dispatch => {
    dispatch({
      type: meeting.LIST_FETCH_REQUEST,
    });

    return api.get('/meetings')
    .then(({meetings}) => {
      dispatch({
        type: meeting.LIST_FETCH_SUCCESS,
        meetings,
      });
      return meetings;

    }).catch(reason => {
      dispatch({
        type: meeting.LIST_FETCH_FAILED,
        reason,
      });
      throw reason;

    });
  };
}

export function meetingDelete(mid) {
  return dispatch => {
    dispatch({
      type: meeting.DELETE_REQUEST,
      mid,
    });

    return api.del('/meetings/' + mid)
    .then(() => {
      dispatch({
        type: meeting.DELETE_SUCCESS,
        mid,
      });

    }).catch(reason => {
      dispatch({
        type: meeting.DELETE_FAILED,
        mid, reason,
      });
      throw reason;

    });
  };
}

