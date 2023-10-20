import {applyMiddleware, createStore, combineReducers} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import thunk from 'redux-thunk';

import AsyncStorage from '@react-native-async-storage/async-storage';

import loader from './reducers/loaderReducer';
import auth from './reducers/authReducer';
import tutorial from './reducers/tutorialReducer';

import {LOGOUT} from './actionTypes';

const appReducer = combineReducers({
  loader,
  auth,
  tutorial,
});

const rootReducer = (state, action) => {
  if (action.type === LOGOUT) {
    return appReducer({tutorial: state.tutorial}, action);
  }
  return appReducer(state, action);
};

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth', 'tutorial', 'list'],
  timeout: null,
};
const middleware = [thunk];
const persistedReducer = persistReducer(persistConfig, rootReducer);
let store = null;
let persistor = null;
store = createStore(persistedReducer, applyMiddleware(...middleware));
persistor = persistStore(store);
export default store;
