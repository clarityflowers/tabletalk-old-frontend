import {
  START_LOGIN,
  LOGIN,
  FAIL_LOGIN
} from "./actions"

import api from './api';

const actionCreator = (type, ...params) => (args) => {
  const values = params.reduce((accumulator, value) =>  ({[value]: args[value], ...accumulator}), {});
  return {type, ...values};
}


const startLogin = actionCreator(START_LOGIN);
const login = actionCreator(LOGIN, "jwt");
const failLogin = actionCreator(FAIL_LOGIN);


export const loginWithGoogle = googleJWT => dispatch => {
  dispatch(startLogin());
  api.auth.login("google", googleJWT)
    .then(({jwt}) => dispatch(login({jwt})))
    .catch(error => dispatch(failLogin()));
}