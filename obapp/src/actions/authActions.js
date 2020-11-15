import {
    LOGIN,
    LOGOUT
} from './authTypes'

export const login = (_username, _session_token) => ({
    type: LOGIN,
    username: _username,
    session_token: _session_token,
  });
  
  export const logout = () => ({
    type: LOGOUT,
    email: '',
    session_token: '',
  });
