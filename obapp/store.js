import { createStore, combineReducers } from 'redux';
import authReducer from './src/reducers/authReducer';

const rootReducer = combineReducers({
    authReducer: authReducer
})

const store = createStore(rootReducer);

export default store;