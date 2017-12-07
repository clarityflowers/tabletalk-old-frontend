import {
  ROUTE
} from "common/actions"

import actionCreator from 'utils/actionCreator';

const setPath = actionCreator(ROUTE, "path");

export const route = path => (dispatch, getState) => {
  dispatch(setPath({path}));
  // onRoute(path, dispatch, getState());
}

export const goTo = path => (_dispatch, _getState, {history}) => {
  history.push("/" + path.join("/"));
}
export const goBack = () => (_dispatch, _getState, {history}) => {
  history.goBack();
}
export const replace = path => (_dispatch, _getState, {history}) => {
  history.replace("/" + path.join("/"));
} 