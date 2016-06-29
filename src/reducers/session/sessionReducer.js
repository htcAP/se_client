import { session } from './sessionActions';

export const initialState = {
  session: {
    loggedIn: false,
    loggingIn: false,
    loginFailed: false,
    failedReason: {},
    username: '',
    uid: -1,
  },
};

export function reducer(state = initialState.session, action) {
  switch (action.type) {
    case session.LOGIN_REQUEST:
    return {
      loggedIn: false,
      loggingIn: true,
      loginFailed: false,
    };

    case session.LOGIN_SUCCESS:
    return {
      loggedIn: true,
      loggingIn: false,
      loginFailed: false,
      uid: action.uid,
      username: action.username,
    };

    case session.LOGIN_FAILED:
    return {
      loggedIn: false,
      loggingIn: false,
      loginFailed: true,
      failedReason: action.reason,
    };

    default:
    return state;
  }
}
