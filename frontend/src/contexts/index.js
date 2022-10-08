import { createContext } from 'react';

const AuthContext = createContext({});
const ApiContext = createContext(null);
const ModalContext = createContext(null);
const FormContext = createContext(null);
const AuthErrorContext = createContext(null);
const WindowWidthContext = createContext(null);

export {
  AuthContext,
  ApiContext,
  ModalContext,
  FormContext,
  AuthErrorContext,
  WindowWidthContext,
};
