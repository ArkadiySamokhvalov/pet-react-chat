import { useContext } from 'react';

import { AuthContext, SocketContext, ModalContext } from '../contexts/index.js';

export const useAuth = () => useContext(AuthContext);
export const useSocket = () => useContext(SocketContext);
export const useModal = () => useContext(ModalContext);
