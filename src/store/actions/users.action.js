import { createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'universal-cookie/es6';
import axios from 'axios';

// const host = 'http://localhost:8080';

export const getAllUsers = createAsyncThunk('users/getAll', async (thunkApi) => {
  try {
    const cookies = new Cookies();
    const response = await axios({
      method: 'get',
      url: `/api/users/get`,
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
      url: `/api/users/register`,
      data: formData,
      headers: {
        'Content-Type': 'application/json',
        'auth-token': cookies.get('auth-token'),
      },
    });
    return response.data;
  } catch (e) {
    console.log(e?.response?.data.error);
    return thunkApi.rejectWithValue(e?.response?.data?.error || 'Произошла непредвиденная ошибка');
  }
});

export const DeleteUser = createAsyncThunk('users/delete', async (id, thunkApi) => {
  try {
    const cookies = new Cookies();
    const response = await axios({
      method: 'delete',
      url: `/api/users/del/${id}`,
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
