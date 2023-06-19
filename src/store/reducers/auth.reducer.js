import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'universal-cookie/es6';
import { signOut, signIn } from '../actions/auth.action';
import { defaultFulfilledReducer, pendingReducer, rejectedReducer } from './base.reducer';

const initialState = {
  success: false,
  isLoading: false,
  error: '',
};

export const authReducer = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearAuth(state) {
      state.success = false;
    },
    clearError(state) {
      state.error = '';
    },
  },
  extraReducers: {
    [signIn.fulfilled]: (state, action) => {
      const cookies = new Cookies();
      cookies.set('auth-token', action.payload.token, { path: '/' });
      // eslint-disable-next-line no-underscore-dangle
      cookies.set('user', action.payload.id, { path: '/' });
      cookies.set('role', action.payload.role_id, { path: '/' });
      state.success = true;
      defaultFulfilledReducer(state);
    },
    [signIn.pending]: pendingReducer,
    [signIn.rejected]: rejectedReducer,
    [signOut.fulfilled]: (state) => {
      const cookies = new Cookies();

      cookies.remove('auth-token', { path: '/' });
      cookies.remove('user', { path: '/' });
      cookies.remove('role', { path: '/' });
      state.error = '';
      state.isLoading = false;
    },
    [signOut.pending]: pendingReducer,
    [signOut.rejected]: rejectedReducer,
  },
});

export default authReducer.reducer;
