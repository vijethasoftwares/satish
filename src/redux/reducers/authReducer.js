import * as ActionTypes from '../actionTypes';

const initialState = {
  data: {},
  register: {},
  forgotData: {},
  user: undefined,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.LOGIN:
      return {
        ...state,
        data: action.payload,
      };
    case ActionTypes.GOOGLE_LOGIN:
      return {
        ...state,
        data: action.payload,
      };
    case ActionTypes.USER_GOOGLE:
      return {
        ...state,
        user: action.payload,
      };
    case ActionTypes.SIGNUP:
      return {
        ...state,
        register: action.payload,
      };
    case ActionTypes.FORGOTPASSWORD:
      return {
        ...state,
        forgotData: action.payload,
      };
    case ActionTypes.LOGOUT:
      return {
        ...state,
        data: action.payload,
      };

    default:
      return state;
  }
};
