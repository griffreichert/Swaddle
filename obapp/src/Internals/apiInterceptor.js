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
    const status = error.response
    if (status !== 200 | status !== 201) {
        console.log('ERR in interceptor')
        console.log(status)
    }
    if (status === 401 | status === 403) {
        store.dispatch(logout());
    }
    return error;
};

export { apiRequestInterceptor, apiResponseInterceptor };