import { user } from './userActions';

export const initialState = {
  user: {
    items: {},
    listFetching: false,
  },
};

export function reducer(state = initialState.user, action) {
  switch (action.type) {
    case user.LIST_FETCH_REQUEST:
    return {
      ...state,
      listFetching: true,
    };

    case user.LIST_FETCH_SUCCESS:
    let users = {};
    action.users.forEach((u) => {
      users[u.uid] = u;
    });
    return {
      ...state,
      items: {
        ...state.items,
        ...users,
      },
      listFetching: false,
    };

    case user.LIST_FETCH_FAILED:
    return {
      ...state,
      listFetching: false,
    };

    default:
    return state;
  }
}
