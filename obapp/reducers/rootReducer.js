import { combineReducers } from 'redux';
import authReducer from './authReducer'

//This file combines reducers to make them easier to access. If at any point 
//you create a new reducer file, you need to add it below.

const rootReducer = combineReducers({
  authReducer: authReducer,
});

export default rootReducer;