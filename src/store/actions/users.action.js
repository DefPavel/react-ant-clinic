import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const host = process.env.REACT_APP_API_HOST;

export const getAllUsers = createAsyncThunk('users/getAll', async (thunkApi) => {
  try {
    const response = await axios({
      method: 'get',
      url: `${host}/api/users/get`,
    });
    return response.data;
  } catch (e) {
    return thunkApi.rejectWithValue(e?.response?.data?.error || 'Произошла непредвиденная ошибка');
  }
});

export const AddUser = createAsyncThunk('users/insert', async ({ formData }, thunkApi) => {
  try {
    const response = await axios({
      method: 'post',
      url: `${host}/api/users/register`,
      data: formData,
    });
    return response.data;
  } catch (e) {
    return thunkApi.rejectWithValue(e?.response?.data?.error || 'Произошла непредвиденная ошибка');
  }
});

export const UpdateChecked = createAsyncThunk('users/checked', async ({ id, status }, thunkApi) => {
  try {
    const response = await axios({
      method: 'post',
      url: `${host}/api/users/checked`,
      data: { id, status },
    });
    return response.data;
  } catch (e) {
    return thunkApi.rejectWithValue(e?.response?.data?.error || 'Произошла непредвиденная ошибка');
  }
});

export const DeleteUser = createAsyncThunk('users/delete', async (id, thunkApi) => {
  try {
    const response = await axios({
      method: 'delete',
      url: `${host}/api/users/del/${id}`,
    });
    return response.data;
  } catch (e) {
    return thunkApi.rejectWithValue(e?.response?.data?.error || 'Произошла непредвиденная ошибка');
  }
});
