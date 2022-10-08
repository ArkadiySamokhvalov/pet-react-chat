import { useContext } from 'react';

import {
  AuthContext, ApiContext, ModalContext, FormContext, AuthErrorContext,
} from '../contexts/index.js';

export const useAuth = () => useContext(AuthContext);
export const useApi = () => useContext(ApiContext);
export const useModal = () => useContext(ModalContext);
export const useForm = () => useContext(FormContext);
export const useAuthError = () => useContext(AuthErrorContext);
