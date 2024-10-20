import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { User } from '../../types';
import axiosInstance from '../../api/axiosInstance';

export const fetchUserData = createAsyncThunk<User, string>(
  'users/fetchUserData',
  async (token: string, thunkAPI) => {
    try {
      const response = await axiosInstance.get('/users', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError && error.response && error.response.data) {
        if (error.response.status === 401) {
          return thunkAPI.rejectWithValue('Unauthorized');
        }

        const errorMessage = error.response.data.ErrorMessageJP || 'エラーが発生しました。';
        return thunkAPI.rejectWithValue(errorMessage);
      }
      return thunkAPI.rejectWithValue('ネットワークエラーが発生しました。');
    }
  }
);

interface userState {
  userData: User | null;
  isAuthenticated: boolean | null;
  errorMessage: string | undefined;
}

const initialState: userState = {
  userData: null,
  isAuthenticated: null,
  errorMessage: undefined,
};

const userSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    signin: (state) => {
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserData.fulfilled, (state, action) => {
      state.userData = action.payload;
      state.isAuthenticated = true;
      state.errorMessage = undefined;
    });
    builder.addCase(fetchUserData.rejected, (state, action) => {
      state.userData = null;
      if (action.payload === 'Unauthorized') {
        state.isAuthenticated = false;
        state.errorMessage = '認証に失敗しました。';
      } else {
        state.errorMessage = action.error.message;
      }
      state.isAuthenticated = false;
    });
  },
});

export default userSlice.reducer;
export const { signin, logout } = userSlice.actions;
