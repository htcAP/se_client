import { meeting } from './meetingActions';

export const initialState = {
  meeting: {
    items: {},
    listFetching: false,
    suggestionFetching: false,
    suggestions: {},
  },
};

function transformMeeting(m) {
  m.start_time = new Date(m.start_time);
  m.end_time = new Date(m.end_time);

  return m;
}

export function reducer(state = initialState.meeting, action) {
  switch (action.type) {
    case meeting.LIST_FETCH_REQUEST:
    return {
      ...state,
      listFetching: true,
    };

    case meeting.LIST_FETCH_SUCCESS:
    let meetings = {};
    action.meetings.map(transformMeeting).forEach((m) => {
      meetings[m.mid] = m;
    });
    return {
      ...state,
      items: {
        ...state.items,
        ...meetings,
      },
      listFetching: false,
    };

    case meeting.LIST_FETCH_FAILED:
    return {
      ...state,
      listFetching: false,
    };

    case meeting.DELETE_REQUEST:
    return {
      ...state,
      items: {
        ...state.items,
        [action.mid]: {
          ...state.items[action.mid],
          deleting: true,
        }
      }
    };

    case meeting.DELETE_FAILED:
    return {
      ...state,
      items: {
        ...state.items,
        [action.mid]: {
          ...state.items[action.mid],
          deleting: false,
        }
      }
    };

    case meeting.DELETE_SUCCESS:
    let items = Object.assign({}, state.items);
    delete items[action.mid];
    return {
      ...state,
      items,
    };

    case meeting.SUGGESTION_REQUEST:
    return {
      ...state,
      suggestionFetching: true,
      suggestions: {},
    };

    case meeting.SUGGESTION_SUCCESS:
    return {
      ...state,
      suggestionFetching: false,
      suggestions: action.suggestions,
    };

    case meeting.SUGGESTION_FAILED:
    return {
      ...state,
      suggestionFetching: false,
      suggestions: {},
    };

    default:
    return state;
  }
}
