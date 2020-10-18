import { LOGIN, LOGOUT } from '../actions/authTypes';

const initialState = {
    login_status: 0
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            return {...state,
            login_status: 1}
        case LOGOUT:
            return {...state,
            login_status: 0}
        default:
            return {state}
    }
}

export default authReducer;