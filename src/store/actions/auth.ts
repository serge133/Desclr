import Axios from 'axios';
import { AuthActions } from '../types';
import { saveCredentialsToStorage } from '../utility';
export const AUTHENTICATE = 'AUTHENTICATE';
export const SIGNUP = 'SIGNUP';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

let timer: NodeJS.Timeout;

export const authenticate = (
  token: string,
  userId: string,
  expiryTime: number
) => {
  return async (dispatch: (action: AuthActions) => void) => {
    // expire time is in ms
    dispatch(setLogoutTimer(expiryTime));
    dispatch({
      type: AUTHENTICATE,
      token: token,
      userId: userId,
    });
  };
};

export const signup = (email: string, password: string) => {
  return async (dispatch: (action: AuthActions) => void) => {
    try {
      const response = await Axios({
        url:
          'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAcH4q-jC7ZJcJXPYQasWsiQdWrEdjpexI',
        method: 'POST',
        data: {
          email: email,
          password: password,
          returnSecureToken: true,
        },
      });
      const {
        idToken: token,
        localId: userId,
        expiresIn,
      }: {
        idToken: string;
        localId: string;
        expiresIn: string;
      } = response.data;

      const expirationDate = new Date(
        new Date().getTime() + +expiresIn * 1000
      ).toISOString();
      saveCredentialsToStorage(token, userId, expirationDate);
      // dispatch({
      //   type: SIGNUP,
      //   token: token,
      //   userId: userId,
      //   expirationDate: expirationDate,
      // });
      dispatch(authenticate(token, userId, +expiresIn * 1000));
    } catch (err) {
      console.log(err);
    }
  };
};

export const login = (email: string, password: string) => {
  return async (dispatch: (action: AuthActions) => void) => {
    try {
      const response = await Axios({
        url:
          'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAcH4q-jC7ZJcJXPYQasWsiQdWrEdjpexI',
        method: 'POST',
        data: {
          email: email,
          password: password,
          returnSecureToken: true,
        },
      });
      const { idToken: token, localId: userId, expiresIn } = response.data;
      const expirationDate = new Date(
        new Date().getTime() + +expiresIn * 1000
      ).toISOString();

      // dispatch({
      //   type: LOGIN,
      //   token: token,
      //   userId: userId,
      //   expirationDate: expirationDate,
      //   error: false,
      //   errorMessage: '',
      // });
      // * EXPIRES IN is in SECONDS
      dispatch(authenticate(token, userId, +expiresIn * 1000));
      saveCredentialsToStorage(token, userId, expirationDate);
    } catch (err) {
      dispatch({
        type: LOGIN,
        token: '',
        userId: '',
        expirationDate: '',
        error: true,
        errorMessage: 'Incorrect User',
      });
    }
  };
};

export const logout = (): AuthActions => {
  clearLogoutTimer();
  // Wipe token data
  saveCredentialsToStorage('', '', '');
  return { type: LOGOUT };
};

const clearLogoutTimer = () => {
  if (timer) {
    clearTimeout(timer);
  }
};

const setLogoutTimer = (expirationTime: number) => {
  return async (dispatch: (action: AuthActions) => void) => {
    timer = setTimeout(() => {
      dispatch(logout());
    }, expirationTime);
  };
};
