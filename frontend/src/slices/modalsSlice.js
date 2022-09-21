/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';

const modalsSlice = createSlice({
  name: 'modals',
  initialState: {
    type: null,
    channel: null,
    show: false,
  },
  reducers: {
    openModal: (state, { payload }) => {
      state.show = true;
      state.type = payload.type;
      state.channel = payload.channel;
    },
    closeModal: (state) => {
      state.show = false;
      state.type = null;
      state.channel = null;
    },
  },
});

export const { openModal, closeModal } = modalsSlice.actions;
export default modalsSlice.reducer;
