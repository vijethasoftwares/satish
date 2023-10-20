import * as ActionTypes from '../actionTypes';

const initialState = {
  data: {},
  transaction: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.WALLET:
      return {
        ...state,
        data: action.payload,
      };
    case ActionTypes.WALLET_TRANSACTION:
      return {
        ...state,
        transaction: action.payload,
      };

    default:
      return state;
  }
};
