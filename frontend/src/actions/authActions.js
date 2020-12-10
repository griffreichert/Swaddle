import {
    LOGIN,
    LOGOUT
} from './authTypes'

export const login = (_email, _session_token) => ({
    type: LOGIN,
    email: _email,
    session_token: _session_token,
  });
  
  export const logout = () => ({
    type: LOGOUT,
    email: '',
    session_token: '',
  });
