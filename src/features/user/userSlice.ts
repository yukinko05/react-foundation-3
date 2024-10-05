import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { User } from '../../types';

export const fetchUserData = createAsyncThunk<User, string>(
  'users/fetchUserData',
  async (token: string) => {
    try {
      const response = await axios.get('https://railway.bookreview.techtrain.dev/users', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError && error.response && error.response.data) {
        const errorMessage = error.response.data.ErrorMessageJP || 'エラーが発生しました。';
        throw new Error(errorMessage);
      }
      throw new Error('ネットワークエラーが発生しました。');
    }
  }
);

interface userState {
  userData: User | null;
  errorMessage: string | undefined;
}

const initialState: userState = {
  userData: null,
  errorMessage: undefined,
};

const userSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUserData.fulfilled, (state, action) => {
      state.userData = action.payload;
      state.errorMessage = undefined;
    });
    builder.addCase(fetchUserData.rejected, (state, action) => {
      state.userData = null;
      state.errorMessage = action.error.message;
    });
  },
});

export default userSlice.reducer;
