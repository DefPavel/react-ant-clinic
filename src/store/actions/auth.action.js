import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const host = process.env.REACT_APP_API_HOST;

export const signIn = createAsyncThunk('auth/signIn', async ({ username, password }, thunkApi) => {
  try {
    const response = await axios.post(`${host}/api/users/login`, { username, password });
    return response.data;
  } catch (e) {
    return thunkApi.rejectWithValue(e?.response?.data?.error || 'Произошла непредвиденная ошибка');
  }
});

export const signOut = createAsyncThunk('auth/signOut', async (_, thunkApi) => {
  try {
    const response = await axios.post(`${host}/api/users/logout`);
    return response.data;
  } catch (e) {
    return thunkApi.rejectWithValue(e?.response?.data.error || 'Произошла непредвиденная ошибка');
  }
});
