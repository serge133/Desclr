import authReducer from './reducers/auth';
import habitReducer from './reducers/habit';
import { combineReducers } from 'redux';

export default combineReducers({
  auth: authReducer,
  habit: habitReducer,
});
