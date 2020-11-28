import store from '../../store';
import { logout } from '../actions/authActions';

const apiRequestInterceptor = (req) => {
  const state = store.getState();
  if (!state.authReducer.session_token) {
      return req;
    }
  req.headers = { 'token': state.authReducer.session_token };
  return req;
};

const apiResponseInterceptor = (error) => {
    const status = error.response
    if(status > 299) {
        console.log('[ERR Status]: ' + status)
        store.dispatch(logout());
    }
    return Promise.reject(error);
  };
  
  export {apiRequestInterceptor, apiResponseInterceptor};