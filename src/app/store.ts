import { configureStore } from '@reduxjs/toolkit';
import offsetReducer from '../features/bookReviews/offsetSlice';
import authReducer from '../features/auth/authSlice';

export const store = configureStore({
  reducer: {
    offset: offsetReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
