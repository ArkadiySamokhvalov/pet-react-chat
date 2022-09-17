/* eslint-disable no-param-reassign */

import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';
import { actions as channelsActions, fetchChatData } from './channelsSlice.js';
import promisifySocket from '../utils/promisifySocket.js';

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
const initialState = messagesAdapter.getInitialState();

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
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
        const { messages } = payload;
        const allEntities = Object.values(state.entities);
        const restEntities = allEntities.filter((e) => messages.includes(e.id)).map(({ id }) => id);

        messagesAdapter.removeMany(state, restEntities);
      });
  },
});

export const { actions } = messagesSlice;
export const selectors = messagesAdapter.getSelectors((state) => state.messages);
export default messagesSlice.reducer;
