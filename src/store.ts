import { configureStore } from '@reduxjs/toolkit';
import offsetReducer from './bookReviewsSlice';

export const store = configureStore({
  reducer: {
    offset: offsetReducer,
  },
});
