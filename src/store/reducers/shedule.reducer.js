import { createSlice } from '@reduxjs/toolkit';
import { getAllShedule } from '../actions/shedule.action';
import { defaultFulfilledReducer, pendingReducer, rejectedReducer } from './base.reducer';

const initialState = {
  schedule: [],
  isLoading: false,
  error: '',
};

export const scheduleReducer = createSlice({
  name: 'schedule',
  initialState,
  extraReducers: {
    [getAllShedule.fulfilled]: (state, action) => {
      state.schedule = action.payload || [];
      defaultFulfilledReducer(state);
    },
    [getAllShedule.pending]: pendingReducer,
    [getAllShedule.rejected]: rejectedReducer,
  },
});

export default scheduleReducer.reducer;
