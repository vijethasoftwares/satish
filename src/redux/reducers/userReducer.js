import * as ActionTypes from '../actionTypes';

const initialState = {
  dashboard: null,
  profile: null,
  doctor: null,
  lab_test: null,
  doctor_list: [],
  doctor_detail: {},
  test_list: [],
  lab_list: [],
  lab_slot: [],
  time_slot: [],
  tryAnother: [],
  packagelist: [],
  packagelistdetail: {},
  patient_list: [],
  selected: {},
  test_cart: [],
  package_cart: {},
  addressList: [],
  selected_service: null,

  time_date: {},
  lab_booking: {},
  lab_appointment: [],
  lab_appointment_detail: {},
  lab_package_appointment_detail: {},
  lab_package_appointment: [],
  selected_date_time_slot: null,
  doctor_appointment: {},
  timeSlotDoctor: [],
  timeDoctor: [],
  orderdoctor: [],
  cartDoctor: [],
  prescription: {},
  reviewlist: [],
  notification: [],
  reschedule: {},
  getallprescription: [],
  specializationAndSymtoms: 1,
  report: [],
  lab_screen_order: '',
  id: '',
  appointment_detail: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.DASHBOARD:
      return {
        ...state,
        dashboard: action.payload,
      };
    case ActionTypes.PROFILE:
      return {
        ...state,
        profile: action.payload,
      };
    case ActionTypes.DOCTOR:
      return {
        ...state,
        doctor: action.payload,
      };
    case ActionTypes.DOCTOR_LIST:
      return {
        ...state,
        doctor_list: action.payload,
      };
    case ActionTypes.DOCTOR_DETAIL:
      return {
        ...state,
        doctor_detail: action.payload,
      };
    case ActionTypes.TRY_ANOTHER:
      return {
        ...state,
        tryAnother: action.payload,
      };
    case ActionTypes.LABTEST:
      return {
        ...state,
        lab_test: action.payload,
      };
    case ActionTypes.PATIENT_LIST:
      return {
        ...state,
        patient_list: action.payload,
      };
    case ActionTypes.TESTLIST:
      return {
        ...state,
        test_list: action.payload,
      };
    case ActionTypes.LABLIST:
      return {
        ...state,
        lab_list: action.payload,
      };
    case ActionTypes.LABSLOT:
      return {
        ...state,
        lab_slot: action.payload,
      };
    case ActionTypes.PACKAGE_LIST:
      return {
        ...state,
        packagelist: action.payload,
      };
    case ActionTypes.PACKAGE_LIST_DETAIL:
      return {
        ...state,
        packagelistdetail: action.payload,
      };
    case ActionTypes.DOCTOR_TIME_SLOTS:
      return {
        ...state,
        time_slot: action.payload,
      };
    case ActionTypes.SELECTED_ITEM:
      return {
        ...state,
        selected: action.payload,
      };
    case ActionTypes.SELECTED_SERVICE:
      return {
        ...state,
        selected_service: action.payload,
      };
    case ActionTypes.CART_TEST:
      return {
        ...state,
        test_cart: action.payload,
      };
    case ActionTypes.CART_PACKAGE:
      return {
        ...state,
        package_cart: action.payload,
      };
    case ActionTypes.GET_ADDRESS:
      return {
        ...state,
        addressList: action.payload,
      };

    case ActionTypes.TIME_DATE_SELECTED:
      return {
        ...state,
        time_date: action.payload,
      };
    case ActionTypes.LAB_BOOKING:
      return {
        ...state,
        lab_booking: action.payload,
      };
    case ActionTypes.LAB_SCREEN_ORDER:
      return {
        ...state,
        lab_screen_order: action.payload,
      };
    case ActionTypes.LAB_APPOINTMENT:
      return {
        ...state,
        lab_appointment: action.payload,
      };
    case ActionTypes.LAB_PACKAGE_APPOINTMENT:
      return {
        ...state,
        lab_package_appointment: action.payload,
      };
    case ActionTypes.LAB_APPOINTMENT_DETAIL:
      return {
        ...state,
        lab_appointment_detail: action.payload,
      };
    case ActionTypes.LAB_PACKAGE_APPOINTMENT_DETAIL:
      return {
        ...state,
        lab_package_appointment_detail: action.payload,
      };
    case ActionTypes.SELECTED_DATE_TIME_SLOT:
      return {
        ...state,
        selected_date_time_slot: action.payload,
      };
    case ActionTypes.DOCTOR_BOOKING:
      return {
        ...state,
        doctor_appointment: action.payload,
      };
    case ActionTypes.DOCTORSLOT:
      return {
        ...state,
        timeSlotDoctor: action.payload,
      };
    case ActionTypes.DOCTORSPHYLOT:
      return {
        ...state,
        timeDoctor: action.payload,
      };
    case ActionTypes.DOCTOR_ORDER:
      return {
        ...state,
        orderdoctor: action.payload,
      };
    case ActionTypes.DOCTOR_ORDER_DETAIL:
      return {
        ...state,
        appointment_detail: action.payload,
      };
    case ActionTypes.DOCTOR_CART:
      return {
        ...state,
        cartDoctor: action.payload,
      };
    case ActionTypes.PRESCRIPTION:
      return {
        ...state,
        prescription: action.payload,
      };
    case ActionTypes.REVIEW_LIST:
      return {
        ...state,
        reviewlist: action.payload,
      };
    case ActionTypes.NOTICATION:
      return {
        ...state,
        notification: action.payload,
      };
    case ActionTypes.RESCHEDULE:
      return {
        ...state,
        reschedule: action.payload,
      };
    case ActionTypes.GET_ALL_PRESCRIPTION:
      return {
        ...state,
        getallprescription: action.payload,
      };
    case ActionTypes.SERVICES:
      return {
        ...state,
        specializationAndSymtoms: action.payload,
      };
    case ActionTypes.GET_ALL_REPORT:
      return {
        ...state,
        report: action.payload,
      };
    case ActionTypes.DOCTOR_ID:
      return {
        ...state,
        id: action.payload,
      };

    default:
      return state;
  }
};
