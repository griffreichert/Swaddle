import { LOGIN, LOGOUT } from '../actions/authTypes';

const initialState = {
    username: '',
    session_token: '',
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            return {...state,
            username: action.username,
            session_token: action.session_token}
        case LOGOUT:
            return {...state,
            username: '',
            session_token: ''}
        default:
            return {state}
    }
}

export default authReducer;