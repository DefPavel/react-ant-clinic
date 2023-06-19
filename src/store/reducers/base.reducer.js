export const pendingReducer = (state) => {
  state.isLoading = true;
};

export const rejectedReducer = (state, action) => {
  state.isLoading = false;
  if (action) state.error = action.payload?.error || action.payload;
};

export const defaultFulfilledReducer = (state) => {
  state.isLoading = false;
  state.error = '';
};
