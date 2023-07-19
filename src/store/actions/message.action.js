import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const host = process.env.REACT_APP_API_HOST;

export const createMessage = createAsyncThunk('message/create', async ({ formData }, thunkApi) => {
  try {
    const response = await axios({
      method: 'post',
      url: `${host}/api/message/create`,
      data: formData,
    });
    return response.data;
  } catch (e) {
    return thunkApi.rejectWithValue(e?.response?.data?.error || 'Произошла непредвиденная ошибка');
  }
});

export const getAllMessage = createAsyncThunk('message/get', async (thunkApi) => {
  try {
    const response = await axios({
      method: 'get',
      url: `${host}/api/message/get`,
    });
    return response.data;
  } catch (e) {
    return thunkApi.rejectWithValue(e?.response?.data?.error || 'Произошла непредвиденная ошибка');
  }
});

export const getTodayMessage = createAsyncThunk('message/today', async (thunkApi) => {
  try {
    const response = await axios({
      method: 'get',
      url: `${host}/api/message/today`,
    });
    return response.data;
  } catch (e) {
    return thunkApi.rejectWithValue(e?.response?.data?.error || 'Произошла непредвиденная ошибка');
  }
});

export const deleteMessage = createAsyncThunk('message/delete', async (id, thunkApi) => {
  try {
    const response = await axios({
      method: 'delete',
      url: `${host}/api/message/del/${id}`,
    });
    return response.data;
  } catch (e) {
    return thunkApi.rejectWithValue(e?.response?.data?.error || 'Произошла непредвиденная ошибка');
  }
});
