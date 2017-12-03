import { combineReducers } from 'redux';
import {
  START_LOGIN,
  LOGIN,
  FAIL_LOGIN,
  LOGOUT
} from './actions';

export default combineReducers({
  auth: combineReducers({

    pending: (state = false, action) => {
      switch(action.type) {
        case START_LOGIN: 
          return true;
        case LOGIN:
        case FAIL_LOGIN: 
          return false;
        default:
          return state;
      }
    },

    jwt: (state = null, action) => {
      switch(action.type) {
        case LOGIN: 
          return action.jwt;
        case LOGOUT:
          return null;
        default:
          return state;
      }
    },

    error: (state = false, action) => {
      switch(action.type) {
        case START_LOGIN:
          return false;
        case FAIL_LOGIN:
          return true;
        default:
          return state;
      }
    }
  })
});
