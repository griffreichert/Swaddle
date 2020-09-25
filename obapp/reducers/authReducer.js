import {
    LOGIN,
    LOGOUT
} from '../constants/authTypes';


const initialState = {
    login_status: 0,
    username: '',
    session_id: ""
};

const authReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOGIN: {
            return {
                ...state,
                login_status: 1,
                username: action.username,
                session_id: action.session_id
            }
        }
        case LOGOUT: {
            return {
                ...state,
                login_status: 0,
                username: action.username,
                session_id: action.session_id
            }
        }
        default: {
            return state;
        }
    }
};

export default authReducer;