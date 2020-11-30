import store from '../../store';
import { logout } from '../actions/authActions';

const apiRequestInterceptor = (req) => {
    const state = store.getState();
    console.log('store' + state)
    if (state.authReducer.session_token) {
        req.headers = { 'token': state.authReducer.session_token };
        console.log('headers: ' + req.headers)
    }
    return req;
};

const apiResponseInterceptor = (error) => {
    const status = error.response.status
    if (status !== 200 | status !== 201) {
        console.log('ERR in interceptor: ' + status)
        // console.log(status.status)
    }
    if ( status === 401 ) {
        store.dispatch(logout());
    }
    return Promise.reject(error);
};

export { apiRequestInterceptor, apiResponseInterceptor };