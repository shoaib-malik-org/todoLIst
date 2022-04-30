import { combineReducers } from "redux";
import task from './taskReducer'
import color from './colorReducer'


export default combineReducers({
  color,
  task
});
