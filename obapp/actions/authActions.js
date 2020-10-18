import {
    LOGIN,
    LOGOUT
} from './authTypes'

// export const login = (val1, val2) => ({
export const login = () => ({
    type: LOGIN,
    // email: val1,
    // session_id: val2,
  });
  
  export const logout = () => ({
    type: LOGOUT,
    // email: '',
    // session_id: '',
  });
