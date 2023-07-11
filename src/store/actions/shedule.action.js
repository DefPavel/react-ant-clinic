import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const host = process.env.REACT_APP_API_HOST;

export const getAllShedule = createAsyncThunk('schedule/get', async (thunkApi) => {
  try {
    const response = await axios({
      method: 'get',
      url: `${host}/api/schedule/getIsChecked`,
    });
    return response.data;
  } catch (e) {
    return thunkApi.rejectWithValue(e?.response?.data?.error || 'Произошла непредвиденная ошибка');
  }
});

export const getSheduleByDoctor = createAsyncThunk('schedule/byDoctor', async (id, thunkApi) => {
  try {
    const response = await axios({
      method: 'get',
      url: `${host}/api/schedule/get/${id}`,
    });
    return response.data;
  } catch (e) {
    return thunkApi.rejectWithValue(e?.response?.data?.error || 'Произошла непредвиденная ошибка');
  }
});

export const GetDoctors = createAsyncThunk('schedule/getDoctors', async (thunkApi) => {
  try {
    const response = await axios({
      method: 'get',
      url: `${host}/api/users/doctors`,
    });
    return response.data;
  } catch (e) {
    return thunkApi.rejectWithValue(e?.response?.data?.error || 'Произошла непредвиденная ошибка');
  }
});

export const addShedule = createAsyncThunk('schedule/insert', async ({ formData }, thunkApi) => {
  try {
    const response = await axios({
      method: 'post',
      url: `${host}/api/schedule/create`,
      data: formData,
    });
    return response.data;
  } catch (e) {
    return thunkApi.rejectWithValue(e?.response?.data?.error || 'Произошла непредвиденная ошибка');
  }
});

export const updateShedule = createAsyncThunk('schedule/update', async ({ formData }, thunkApi) => {
  try {
    const response = await axios({
      method: 'post',
      url: `${host}/api/schedule/update`,
      data: formData,
    });
    return response.data;
  } catch (e) {
    return thunkApi.rejectWithValue(e?.response?.data?.error || 'Произошла непредвиденная ошибка');
  }
});

export const deleteShedule = createAsyncThunk('schedule/delete', async (id, thunkApi) => {
  try {
    const response = await axios({
      method: 'delete',
      url: `${host}/api/schedule/del/${id}`,
    });
    return response.data;
  } catch (e) {
    return thunkApi.rejectWithValue(e?.response?.data?.error || 'Произошла непредвиденная ошибка');
  }
});
