import {combineReducers} from '@reduxjs/toolkit';

// Reducer Imports
import {persistReducer} from 'redux-persist';
import INITIAL_STATE from '../initialState';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import reducer
import app, {appInitialState} from './app';

// Reducer Export
export * from './app';

export const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: Object.keys(INITIAL_STATE),
};

const appPersistConfig = {
  key: 'app',
  storage: AsyncStorage,
};

export const InitialState = {
  app: appInitialState,
};

export default combineReducers({
  app: persistReducer(appPersistConfig, app),
});
