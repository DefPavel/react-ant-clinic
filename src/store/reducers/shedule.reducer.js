import { createSlice } from '@reduxjs/toolkit';
import {
  addShedule,
  getAllShedule,
  getSheduleByDoctor,
  GetDoctors,
} from '../actions/shedule.action';
import { defaultFulfilledReducer, pendingReducer, rejectedReducer } from './base.reducer';

const initialState = {
  schedule: [],
  doctors: [],
  isLoading: false,
  error: '',
};

export const scheduleReducer = createSlice({
  name: 'schedule',
  initialState,
  reducers: {
    clearError(state) {
      state.error = '';
    },
  },
  extraReducers: {
    [getAllShedule.fulfilled]: (state, action) => {
      state.schedule = action.payload || [];
      defaultFulfilledReducer(state);
    },
    [getAllShedule.pending]: pendingReducer,
    [getAllShedule.rejected]: rejectedReducer,
    [getSheduleByDoctor.fulfilled]: (state, action) => {
      state.schedule = action.payload || [];
      defaultFulfilledReducer(state);
    },
    [getSheduleByDoctor.pending]: pendingReducer,
    [getSheduleByDoctor.rejected]: rejectedReducer,
    [addShedule.fulfilled]: defaultFulfilledReducer,
    [addShedule.pending]: pendingReducer,
    [addShedule.rejected]: (state, action) => {
      state.error = action.payload || 'Error';
      rejectedReducer(state);
    },
    [GetDoctors.fulfilled]: (state, action) => {
      state.doctors = action.payload || [];
      defaultFulfilledReducer(state);
    },
    [GetDoctors.pending]: pendingReducer,
    [GetDoctors.rejected]: rejectedReducer,
  },
});

export default scheduleReducer.reducer;
