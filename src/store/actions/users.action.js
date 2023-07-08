import { createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'universal-cookie/es6';
import axios from 'axios';

const host = process.env.REACT_APP_API_HOST;

export const getAllUsers = createAsyncThunk('users/getAll', async (thunkApi) => {
  try {
    const cookies = new Cookies();
    const response = await axios({
      method: 'get',
      url: `${host}/api/users/get`,
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

export const AddUser = createAsyncThunk('users/insert', async ({ formData }, thunkApi) => {
  try {
    const cookies = new Cookies();
    const response = await axios({
      method: 'post',
      url: `${host}/api/users/register`,
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

export const UpdateChecked = createAsyncThunk('users/checked', async ({ id, status }, thunkApi) => {
  try {
    const cookies = new Cookies();
    const response = await axios({
      method: 'post',
      url: `${host}/api/users/checked`,
      data: { id, status },
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

export const DeleteUser = createAsyncThunk('users/delete', async (id, thunkApi) => {
  try {
    const cookies = new Cookies();
    const response = await axios({
      method: 'delete',
      url: `${host}/api/users/del/${id}`,
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
