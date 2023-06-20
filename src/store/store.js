import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authReducer from './reducers/auth.reducer';
import userReducer from './reducers/users.reducer';

const rootReducer = combineReducers({
  authReducer,
  userReducer,
});

export const setupStore = () => configureStore({ reducer: rootReducer });
