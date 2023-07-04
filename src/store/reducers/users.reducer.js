import { createSlice } from '@reduxjs/toolkit';
import { getAllUsers, DeleteUser, AddUser } from '../actions/users.action';
import { defaultFulfilledReducer, pendingReducer, rejectedReducer } from './base.reducer';

const initialState = {
  users: [],
  isLoading: false,
  error: '',
};

export const userReducer = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearError(state) {
      state.error = '';
    },
  },
  extraReducers: {
    [getAllUsers.fulfilled]: (state, action) => {
      state.users = action.payload || [];
      state.error = '';
      defaultFulfilledReducer(state);
    },
    [getAllUsers.pending]: pendingReducer,
    [getAllUsers.rejected]: rejectedReducer,
    [DeleteUser.fulfilled]: defaultFulfilledReducer,
    [DeleteUser.pending]: pendingReducer,
    [DeleteUser.rejected]: rejectedReducer,
    [AddUser.fulfilled]: defaultFulfilledReducer,
    [AddUser.pending]: pendingReducer,
    [AddUser.rejected]: rejectedReducer,
  },
});

export default userReducer.reducer;
