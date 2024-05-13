import {configureStore} from '@reduxjs/toolkit';
import {useDispatch, useSelector as useReduxSelector} from 'react-redux';
import type {TypedUseSelectorHook} from 'react-redux';
import {persistReducer, persistStore} from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import reducers, {persistConfig} from './reducers';

const sagaMiddleware = createSagaMiddleware();

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({serializableCheck: false, thunk: false}).concat(
      sagaMiddleware,
    ),
});

const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type AppState = typeof store.getState;
export type RootState = ReturnType<AppState>;
export const useAppDispatch: () => AppDispatch = useDispatch;

export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;
export {store, persistor};
