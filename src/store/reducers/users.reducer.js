import { createSlice } from '@reduxjs/toolkit';
import { getAllUsers } from '../actions/users.action';
import { defaultFulfilledReducer, pendingReducer, rejectedReducer } from './base.reducer';

const initialState = {
  users: [],
  isLoading: false,
  error: '',
};

export const userReducer = createSlice({
  name: 'user',
  initialState,
  extraReducers: {
    [getAllUsers.fulfilled]: (state, action) => {
      state.users = action.payload || [];
      defaultFulfilledReducer(state);
    },
    [getAllUsers.pending]: pendingReducer,
    [getAllUsers.rejected]: rejectedReducer,
  },
});

export default userReducer.reducer;
