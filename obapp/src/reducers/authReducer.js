import { LOGIN, LOGOUT } from '../actions/authTypes';

const initialState = {
    login_status: 0,
    username: '',
    session_token: '',
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            return {...state,
            login_status: 1,
            username: action.username,
            session_token: action.session_token}
        case LOGOUT:
            return {...state,
            login_status: 0,
            username: '',
            session_token: ''}
        default:
            return {state}
    }
}

export default authReducer;