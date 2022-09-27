import { createContext } from 'react';

const AuthContext = createContext({});
const SocketContext = createContext();
const ModalContext = createContext();
const FormContext = createContext();

export {
  AuthContext, SocketContext, ModalContext, FormContext,
};
