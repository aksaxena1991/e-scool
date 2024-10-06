import {configureStore, Action, Reducer, combineReducers} from '@reduxjs/toolkit';
import createSagaMiddleware from '@redux-saga/core';
import {persistReducer, persistStore} from 'redux-persist';
import { authSlice } from './slices/auth.slice';
import { customerSlice } from './slices/customer.slice';
import storage from 'redux-persist/lib/storage';
// import {combineReducers} from 'redux';
import {rootSaga} from '../sagas';

const persistConfig = {
    key: 'root',
    storage: storage,
};

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];

const appReducer = combineReducers({
    auth: authSlice,
    customer: customerSlice,
});

const rootReducer: Reducer = (state: RootState, action: Action) => {
    if (action.type === 'auth/logout') {
        // TODO: clear all the persisted data here...
      state = {} as RootState;
    }
    //@ts-ignore
    return appReducer(state, action);
  };
  
  const persistedReducer = persistReducer<ReturnType<typeof rootReducer>>(persistConfig, rootReducer);
  
  export const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware => {
      return getDefaultMiddleware({
        serializableCheck: false,
      }).concat(middleware);
    },
  });
  
  export const persistor = persistStore(store);
  
  export type RootState = ReturnType<typeof store.getState>;
  
  export type AppDispatch = typeof store.dispatch;

  sagaMiddleware.run(rootSaga);