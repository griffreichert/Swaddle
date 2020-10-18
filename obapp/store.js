import { createStore, combineReducers } from 'redux';
import authReducer from './reducers/authReducer';

const rootReducer = combineReducers({
    authReducer: authReducer
})

const configureStore = () => createStore(rootReducer);

export default configureStore;