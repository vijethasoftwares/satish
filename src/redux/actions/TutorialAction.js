import * as ActionTypes from '../actionTypes';

export const TutorialCompleteAction = (status) => async (dispatch, getState) => {
  dispatch({type: ActionTypes.TUTORIAL_COMPLETE, payload: status});
};

export const TutorialIncompleteAction = () => async (dispatch, getState) => {
  dispatch({type: ActionTypes.TUTORIAL_INCOMPLETE});
};
