import { LOGIN, LOGOUT } from '../actions/authTypes';

const initialState = {
    email: '',
    session_token: '',
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            return {...state,
            email: action.email,
            session_token: action.session_token}
        case LOGOUT:
            return {...state,
            email: '',
            session_token: ''}
        default:
            return {state}
    }
}

export default authReducer;