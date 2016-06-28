import { session } from './sessionActions';

export const initialState = {
  session: {},
};

export default function sessionReducer(state = initialState, action = {}) {
  switch (action.type) {
    case session.LOGIN_SUCCESS:
      return {
        ...state,
        session: action.session,
      };

    default:
    return state;
  }
}
