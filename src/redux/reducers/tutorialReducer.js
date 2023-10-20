import * as ActionTypes from '../actionTypes';

const initialState = {
  status: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.TUTORIAL_COMPLETE:
      return {
        ...state,
        status: true,
      };
    case ActionTypes.TUTORIAL_INCOMPLETE:
      return {
        ...state,
        status: false,
      };

    default:
      return state;
  }
};
