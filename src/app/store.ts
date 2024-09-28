import { configureStore } from '@reduxjs/toolkit';
import offsetReducer from '../features/bookReviews/offsetSlice';

export const store = configureStore({
  reducer: {
    offset: offsetReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
