import axios from 'axios';
import { configureStore } from '@reduxjs/toolkit';
import { io } from 'socket.io-client';
import routes from '../routes.js';
import channelsReducer from './channelsSlice.js';
import messagesReducer from './messagesSlice.js';
import modalsReducer from './modalsSlice.js';

const socket = io();

const store = configureStore({
  reducer: {
    channels: channelsReducer,
    messages: messagesReducer,
    modals: modalsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    thunk: {
      extraArgument: {
        axios,
        routes,
        socket,
      },
    },
  }),
});

export default store;
