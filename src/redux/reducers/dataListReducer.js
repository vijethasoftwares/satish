import * as ActionTypes from '../actionTypes';

const initialState = {
  city: [],
  area: [],
  country: [],
  location: {},
  faq: [],
  contact: {},
  terms: {},
  about: {},
  policy: {},
  cancel_reason: [],
  device_token: '',
  format_address: '',
  locStatus: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.COUNTRY_LIST:
      return {
        ...state,
        country: action.payload,
      };

    case ActionTypes.LATLNG:
      return {
        ...state,
        location: action.payload,
      };
    case ActionTypes.LOC_STATUS:
      return {
        ...state,
        locStatus: action.payload,
      };
    case ActionTypes.FORMATED_ADDRESS:
      return {
        ...state,
        format_address: action.payload,
      };
    case ActionTypes.FAQ:
      return {
        ...state,
        faq: action.payload,
      };
    case ActionTypes.CONTACT:
      return {
        ...state,
        contact: action.payload,
      };
    case ActionTypes.TERMS:
      return {
        ...state,
        terms: action.payload,
      };
    case ActionTypes.POLICY:
      return {
        ...state,
        policy: action.payload,
      };
    case ActionTypes.ABOUT:
      return {
        ...state,
        about: action.payload,
      };
    case ActionTypes.CANCEL_REASON:
      return {
        ...state,
        cancel_reason: action.payload,
      };
    case ActionTypes.DEVICE_TOKEN:
      return {
        ...state,
        device_token: action.payload,
      };
    default:
      return state;
  }
};
