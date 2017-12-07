import {
  ROUTE
} from 'common/actions';

export default (state = [], action) => {
  switch(action.type) {
    case ROUTE: 
      return action.path;
    default:
      return state;
  }
};