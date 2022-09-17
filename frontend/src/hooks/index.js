import { useContext } from 'react';

import AuthContext from '../contexts/authContext.js';
import { SocketContext } from '../contexts/socketContext.js';

export const useAuth = () => useContext(AuthContext);

export const useSocket = () => useContext(SocketContext);
