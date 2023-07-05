import { createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'universal-cookie/es6';
import axios from 'axios';

const host = process.env.REACT_APP_API_HOST;

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

export const GetDoctors = createAsyncThunk('schedule/getDoctors', async (thunkApi) => {
  try {
    const cookies = new Cookies();
    const response = await axios({
      method: 'get',
      url: `${host}/api/users/doctors`,
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

export const updateShedule = createAsyncThunk('schedule/update', async ({ formData }, thunkApi) => {
  try {
    const cookies = new Cookies();
    const response = await axios({
      method: 'post',
      url: `${host}/api/schedule/update`,
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
