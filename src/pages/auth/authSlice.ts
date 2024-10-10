import { createSlice } from '@reduxjs/toolkit';
import { AuthState } from '../../types';
import { Cookies } from 'react-cookie';

const cookies = new Cookies();

const initialState: AuthState = {
  isAuthenticated: cookies.get('token') !== undefined,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signIn: (state) => {
      state.isAuthenticated = true;
    },
    signOut: (state) => {
      state.isAuthenticated = false;
    },
  },
});

export const { signIn, signOut } = authSlice.actions;
export default authSlice.reducer;
