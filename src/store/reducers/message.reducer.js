import { createSlice } from '@reduxjs/toolkit';
import { getAllMessage, createMessage, getTodayMessage } from '../actions/message.action';
import { defaultFulfilledReducer, pendingReducer, rejectedReducer } from './base.reducer';

const initialState = {
  users: [],
  isLoading: false,
  todayMessage: '',
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
    [getTodayMessage.fulfilled]: (state, action) => {
      state.todayMessage = action.payload?.name || '';
      state.error = '';
      defaultFulfilledReducer(state);
    },
    [getTodayMessage.pending]: pendingReducer,
    [getTodayMessage.rejected]: rejectedReducer,
    [createMessage.fulfilled]: defaultFulfilledReducer,
    [createMessage.pending]: pendingReducer,
    [createMessage.rejected]: rejectedReducer,
  },
});

export default messageReducer.reducer;
