import { store } from '../../store';
import { logout } from '../actions/authActions';


const apiRequestInterceptor = (req) => {
  const state = store.getState();
  if (state.authReducer.login_status === 0 || !state.authReducer.username || !state.authReducer.session_id) {
    return config;
  }
  req.headers = { 'user_name': state.authReducer.username, 'session_id': state.authReducer.session_id};
  return req;
};

const apiResponseInterceptor = (error) => {
    const { status } = error.response
    console.log('api interceptor: ' + status)
    if(status === 401) {
      store.dispatch(logout());
    }
  
    if(status === 403) {
      console.log("Forbidden action.");
    }
  
    return Promise.reject(error);
  };
  
  export {apiRequestInterceptor, apiResponseInterceptor};