import { useContext } from 'react';

import {
  AuthContext, SocketContext, ModalContext, FormContext,
} from '../contexts/index.js';

export const useAuth = () => useContext(AuthContext);
export const useSocket = () => useContext(SocketContext);
export const useModal = () => useContext(ModalContext);
export const useForm = () => useContext(FormContext);
