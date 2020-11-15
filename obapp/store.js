import { createStore, combineReducers } from 'redux';
import authReducer from './src/reducers/authReducer';

const rootReducer = combineReducers({
    authReducer: authReducer
})

const configureStore = () => createStore(rootReducer);

export default configureStore;