import {
  STATUS_SET_UP,
  STATUS_SET_DOWN
} from "common/actions"

import { combineReducers } from 'redux'; 

export default combineReducers({
  up: (state = null, action) => {
    switch(action.type) {
      case STATUS_SET_UP:
        return true;
      case STATUS_SET_DOWN:
        return false;
      default:
        return state;
    }
  }
})