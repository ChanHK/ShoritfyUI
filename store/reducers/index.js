import { combineReducers } from 'redux';
import authReducer from './auth.js';

const rootReducer = combineReducers({
  authenticateReducer: authReducer,
});

export default rootReducer;
