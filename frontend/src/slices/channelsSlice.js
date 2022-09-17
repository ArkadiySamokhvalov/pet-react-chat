/* eslint-disable no-param-reassign */

import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';
import { isEqual } from 'lodash';

export const fetchChatData = createAsyncThunk(
  'channels/fetchChatData',
  async (getAuthHeader, { extra: { axios, routes } }) => {
    const { data } = await axios.get(routes.dataPath(), { headers: getAuthHeader() });
    return data;
  },
);

const channelsAdapter = createEntityAdapter();

const channelsSlice = createSlice({
  name: 'channels',
  initialState: channelsAdapter.getInitialState({
    currentChannelId: null,
    loading: 'idle',
  }),
  reducers: {
    addChannel: channelsAdapter.addOne,
    renameChannel: channelsAdapter.updateOne,
    removeChannel: (state, { payload }) => channelsAdapter.removeOne(state, payload.id),
    setCurrentChannelId: (state, { payload }) => {
      state.currentChannelId = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChatData.pending, (state) => {
        state.loading = 'loading';
        state.error = null;
      })
      .addCase(fetchChatData.fulfilled, (state, { payload }) => {
        const { channels, currentChannelId } = payload;
        const idsChannels = channels.map((channel) => channel.id);

        if (!isEqual(state.ids, idsChannels)) {
          state.ids = idsChannels;
        }

        channels.forEach((channel) => {
          state.entities[channel.id] = { ...channel };
        });

        state.currentChannelId = currentChannelId;

        state.loading = 'idle';
        state.error = null;
      })
      .addCase(fetchChatData.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error;
      });
  },
});

export const { actions } = channelsSlice;
export default channelsSlice.reducer;
