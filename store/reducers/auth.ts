import { AuthActions, AuthState } from '../types';
import { SIGNUP, LOGIN, AUTHENTICATE, LOGOUT } from '../actions/auth';

const initialState = {
  token: '',
  userId: '',
  expirationDate: '',
  isLoggedIn: false,
  error: false,
  errorMessage: '',
};

export default (state: AuthState = initialState, action: AuthActions) => {
  switch (action.type) {
    case AUTHENTICATE:
      const { token, userId } = action;
      return {
        ...state,
        token: token,
        userId: userId,
        isLoggedIn: true,
      };
    case SIGNUP:
      return {
        ...state,
        token: action.token,
        userId: action.userId,
        expirationDate: action.expirationDate,
        isLoggedIn: true,
      };
    case LOGIN:
      if (action.error) {
        console.log('error');
        return {
          ...state,
          error: true,
          errorMessage: action.errorMessage,
          isLoggedIn: false,
        };
      } else {
        console.log('pass');
        return {
          ...state,
          token: action.token,
          userId: action.userId,
          expirationDate: action.expirationDate,
          error: false,
          isLoggedIn: true,
        };
      }
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};
