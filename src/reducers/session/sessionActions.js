import { genActionConstants } from '../../lib/utils';

export const session = genActionConstants('SESSION_', [
  'LOGIN_REQUEST',
  'LOGIN_SUCCESS',
  'LOGIN_FAILED',
]);

export function loginRequest() {
  return {
    type: session.LOGIN_REQUEST
  };
}

export function loginSuccess() {
  return {
    type: session.LOGIN_REQUEST
  };
}

export function loginFailed() {
  return {
    type: session.LOGIN_FAILED
  };
}
