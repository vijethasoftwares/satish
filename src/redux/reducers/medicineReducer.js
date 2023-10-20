import * as ActionTypes from '../actionTypes';

const initialState = {
  data: [],
  medicine_list: [],
  medicine_detail: {},
  cart: {},
  bookingMedicine: {},
  appointment_medicine: [],
  appointment_medicine_detail: {},
  medicinePrescription: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.MEDICINE_DISEASE_LIST:
      return {
        ...state,
        data: action.payload,
      };
    case ActionTypes.MEDICINE_LIST:
      return {
        ...state,
        medicine_list: action.payload,
      };
    case ActionTypes.MEDICINE_DETAIL:
      return {
        ...state,
        medicine_detail: action.payload,
      };
    case ActionTypes.MEDICINE_GET_CART:
      return {
        ...state,
        cart: action.payload,
      };
    case ActionTypes.MEDICINE_BOOKING:
      return {
        ...state,
        bookingMedicine: action.payload,
      };
    case ActionTypes.MEDICINE_APPOINTMENT:
      return {
        ...state,
        appointment_medicine: action.payload,
      };
    case ActionTypes.MEDICINE_APPOINTMENT_DETAIL:
      return {
        ...state,
        appointment_medicine_detail: action.payload,
      };
    case ActionTypes.MEDICINE_PRESCRIPTION:
      return {
        ...state,
        medicinePrescription: action.payload,
      };

    default:
      return state;
  }
};
