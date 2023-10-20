import * as ActionTypes from '../actionTypes';

export const LoaderEnable = () => async (dispatch, getState) => {
  dispatch({type: ActionTypes.LOADER_ENABLE});
};

export const LoaderDisable = () => async (dispatch, getState) => {
  dispatch({type: ActionTypes.LOADER_DISABLE});
};
