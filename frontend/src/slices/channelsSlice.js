/* eslint-disable no-param-reassign */

import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';
import { isEqual } from 'lodash';

import { promisifySocket } from '../utils/index.js';

export const fetchChatData = createAsyncThunk(
  'channels/fetchChatData',
  async (getAuthHeader, { extra: { axios, routes } }) => {
    const { data } = await axios.get(routes.dataPath(), { headers: getAuthHeader() });
    return data;
  },
);

export const createChannelRequest = createAsyncThunk(
  'channels/createChannel',
  async (channel, { extra: { socket } }) => {
    const createChannelSocket = promisifySocket((...arg) => socket.emit('newChannel', ...arg));
    const responce = await createChannelSocket(channel);
    return responce;
  },
);

export const renameChannelRequest = createAsyncThunk(
  'channels/renameChannel',
  async ({ id, name }, { extra: { socket } }) => {
    const renameChannelSocket = promisifySocket((...arg) => socket.emit('renameChannel', ...arg));
    const responce = await renameChannelSocket({ id, name });
    return responce;
  },
);

export const removeChannelRequest = createAsyncThunk(
  'channels/removeChannel',
  async ({ id }, { extra: { socket } }) => {
    const removeChannelSocket = promisifySocket((...arg) => socket.emit('removeChannel', ...arg));
    const responce = await removeChannelSocket({ id });
    return responce;
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
    addChannel: (state, { payload }) => {
      state.currentChannelId = payload.id;
      return channelsAdapter.addOne(state, payload);
    },
    renameChannel: (state, action) => {
      const { id } = action.payload;
      state.entities[id] = { ...state.entities[id], ...action.payload };
    },
    removeChannel: (state, { payload }) => {
      const { id } = payload;
      const { ids } = state;

      if (state.currentChannelId === id) {
        // eslint-disable-next-line prefer-destructuring
        state.currentChannelId = ids[0];
      }

      return channelsAdapter.removeOne(state, id);
    },
    changeCurrentChannel: (state, { payload }) => {
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
