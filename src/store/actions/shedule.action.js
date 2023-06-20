import { createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'universal-cookie/es6';
import axios from 'axios';

const host = 'http://localhost:8080';

export const getAllShedule = createAsyncThunk('schedule/get', async (thunkApi) => {
  try {
    const cookies = new Cookies();
    const response = await axios({
      method: 'get',
      url: `${host}/api/schedule/get`,
      headers: {
        'Content-Type': 'application/json',
        'auth-token': cookies.get('auth-token'),
      },
    });
    return response.data;
  } catch (e) {
    return thunkApi.rejectWithValue(e?.response?.data?.error || 'Произошла непредвиденная ошибка');
  }
});

export const addShedule = createAsyncThunk('schedule/insert', async ({ formData }, thunkApi) => {
  try {
    const cookies = new Cookies();
    const response = await axios({
      method: 'post',
      url: `${host}/api/schedule/create`,
      data: formData,
      headers: {
        'Content-Type': 'application/json',
        'auth-token': cookies.get('auth-token'),
      },
    });
    return response.data;
  } catch (e) {
    return thunkApi.rejectWithValue(e?.response?.data?.error || 'Произошла непредвиденная ошибка');
  }
});
