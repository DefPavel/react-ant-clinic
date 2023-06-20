import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authReducer from './reducers/auth.reducer';
import userReducer from './reducers/users.reducer';
import scheduleReducer from './reducers/shedule.reducer';

const rootReducer = combineReducers({
  authReducer,
  userReducer,
  scheduleReducer,
});

export const setupStore = () => configureStore({ reducer: rootReducer });
