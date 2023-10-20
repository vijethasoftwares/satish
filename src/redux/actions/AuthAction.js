import * as ActionTypes from '../actionTypes';
import * as ApiClient from '../../apiFriend';
import ApiUrls from '../../apiFriend/EndUrls';

export const LoginAction = data => async dispatch => {
  try {
    dispatch({type: ActionTypes.LOADER_ENABLE});
    const endUrl = `${ApiUrls.login}`;
    const headers = {};
    const body = data;
    const method = 'POST';
    let response = await ApiClient.ApiRequest(endUrl, method, headers, body);

    if (response?.meta?.status == true) {
      await dispatch({
        type: ActionTypes.LOGIN,
        payload: response?.data,
      });
    }
    dispatch({type: ActionTypes.LOADER_DISABLE});
    showToast(response?.meta?.msg !== undefined ? response?.meta?.msg : null);
    return response;
  } catch (error) {
    console.log('Network Error Login', error);
    showToast('Network Error!');
    dispatch({type: ActionTypes.LOADER_DISABLE});
    // return error;
  }
};
