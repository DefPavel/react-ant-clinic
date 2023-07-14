import { createSlice } from '@reduxjs/toolkit';
import { getAllMessage, createMessage } from '../actions/message.action';
import { defaultFulfilledReducer, pendingReducer, rejectedReducer } from './base.reducer';

const initialState = {
  users: [],
  isLoading: false,
  error: '',
};

export const messageReducer = createSlice({
  name: 'message',
  initialState,
  reducers: {
    clearError(state) {
      state.error = '';
    },
  },
  extraReducers: {
    [getAllMessage.fulfilled]: (state, action) => {
      state.users = action.payload || [];
      state.error = '';
      defaultFulfilledReducer(state);
    },
    [getAllMessage.pending]: pendingReducer,
    [getAllMessage.rejected]: rejectedReducer,
    [createMessage.fulfilled]: defaultFulfilledReducer,
    [createMessage.pending]: pendingReducer,
    [createMessage.rejected]: rejectedReducer,
  },
});

export default messageReducer.reducer;
