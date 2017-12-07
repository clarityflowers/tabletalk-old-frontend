import {
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGIN_GOOGLE,
  LOGIN_READY
} from "common/actions"

import actionCreator from 'utils/actionCreator';
import api from 'Auth/api';

const startLogin = actionCreator(LOGIN_START);
const setJWT = actionCreator(LOGIN_SUCCESS, "jwt");
const failLogin = actionCreator(LOGIN_FAIL);

export const login = () => (dispatch, getState) => {
  const { auth } = getState();
  const { googleJwt } = auth;
  if (googleJwt) {
    dispatch(startLogin());
    api.login("google", googleJwt)
    .then(({jwt}) => dispatch(setJWT({jwt})))
    .catch(error => dispatch(failLogin()));
  }
}

export const loginReady = actionCreator(LOGIN_READY);

export const setGoogleJWT = actionCreator(LOGIN_GOOGLE, "jwt");