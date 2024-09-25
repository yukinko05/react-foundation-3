import { createSlice } from '@reduxjs/toolkit';
import { OffsetState } from './types';

const initialState: OffsetState = {
  offset: 0,
};

export const offsetSlice = createSlice({
  name: 'offset',
  initialState,
  reducers: {
    nextPage: (state) => {
      state.offset += 10;
    },
    previousPage: (state) => {
      state.offset = Math.max(0, state.offset - 10);
    },
  },
});

export const { nextPage, previousPage } = offsetSlice.actions;
export default offsetSlice.reducer;
