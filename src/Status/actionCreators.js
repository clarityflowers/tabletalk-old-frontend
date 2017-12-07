import {
  STATUS_SET_UP,
  STATUS_SET_DOWN
} from "common/actions"

import actionCreator from 'utils/actionCreator';
import api from './api';

const setStatusUp = actionCreator(STATUS_SET_UP);
const setStatusDown = actionCreator(STATUS_SET_DOWN);



export const getStatus = () => dispatch => {
  api.get()
    .then(_response => dispatch(setStatusUp()))
    .catch(_error => dispatch(setStatusDown()));
}