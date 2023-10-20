import * as ActionTypes from '../actionTypes';

const initialState = {
  status: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.LOADER_ENABLE:
      return {
        ...state,
        status: true,
      };
    case ActionTypes.LOADER_DISABLE:
      return {
        ...state,
        status: false,
      };
    default:
      return state;
  }
};
