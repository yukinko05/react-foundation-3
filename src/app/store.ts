import { configureStore } from '@reduxjs/toolkit';
import offsetReducer from '../features/bookReviews/offsetSlice';
import authReducer from '../pages/auth/authSlice';
import userReducer from '../features/user/userSlice';
import { useDispatch } from 'react-redux';

export const store = configureStore({
  reducer: {
    offset: offsetReducer,
    auth: authReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
