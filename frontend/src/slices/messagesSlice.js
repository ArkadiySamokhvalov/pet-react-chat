/* eslint-disable no-param-reassign */

import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';
import { actions as channelsActions, fetchChatData } from './channelsSlice.js';
import { promisifySocket } from '../utils/index.js';

export const createMessage = createAsyncThunk(
  'messages/createMessage',
  async (message, { getState, extra: { socket } }) => {
    const channelId = getState().channels.currentChannelId;
    const dataFromLocalStorage = localStorage.getItem('user');
    const { username } = JSON.parse(dataFromLocalStorage);
    const createMessageSocket = promisifySocket((...arg) => socket.emit('newMessage', ...arg));
    const responce = await createMessageSocket({
      text: message,
      author: username,
      channelId,
    });
    return responce;
  },
);

const messagesAdapter = createEntityAdapter();

const messagesSlice = createSlice({
  name: 'messages',
  initialState: messagesAdapter.getInitialState(),
  reducers: {
    addMessage: messagesAdapter.addOne,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChatData.fulfilled, (state, { payload }) => {
        const { messages } = payload;

        messagesAdapter.addMany(state, messages);
      })
      .addCase(channelsActions.removeChannel, (state, { payload }) => {
        const { id: channelId } = payload;
        const allEntities = Object.values(state.entities);
        const restEntities = allEntities
          .filter((message) => message.channelId === channelId);

        messagesAdapter.removeMany(state, restEntities);
      });
  },
});

export const { actions } = messagesSlice;
export default messagesSlice.reducer;
