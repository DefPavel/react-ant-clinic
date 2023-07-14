import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const host = process.env.REACT_APP_API_HOST;

export const createMessage = createAsyncThunk(
  'message/create',
  async ({ name, dateCrt }, thunkApi) => {
    try {
      const response = await axios.post(`${host}/api/message/create`, { name, dateCrt });
      return response.data;
    } catch (e) {
      return thunkApi.rejectWithValue(
        e?.response?.data?.error || 'Произошла непредвиденная ошибка',
      );
    }
  },
);

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
