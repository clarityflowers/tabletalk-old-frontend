import { combineReducers } from 'redux';
import {
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGIN_GOOGLE,
  LOGIN_READY
} from 'common/actions';

export default combineReducers({
  ready: (state = false, action) => {
    switch(action.type) {
      case LOGIN_READY:
        return true;
      default: 
        return state;
    }
  },

  pending: (state = false, action) => {
    switch(action.type) {
      case LOGIN_START: 
        return true;
      case LOGIN_SUCCESS:
      case LOGIN_FAIL: 
        return false;
      default:
        return state;
    }
  },

  googleJwt: (state = null, action) => {
    switch(action.type) {
      case LOGIN_GOOGLE:
        return action.jwt;
      default:
        return state;
    }
  },

  jwt: (state = null, action) => {
    switch(action.type) {
      case LOGIN_SUCCESS: 
        return action.jwt;
      default:
        return state;
    }
  },

  error: (state = false, action) => {
    switch(action.type) {
      case LOGIN_START:
        return false;
      case LOGIN_FAIL:
        return true;
      default:
        return state;
    }
  }
});