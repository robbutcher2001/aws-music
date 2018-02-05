import { combineReducers } from 'redux';
import PickerReducer from './reducer-picker';

const rootReducer = combineReducers({
  picker: PickerReducer
});

export default rootReducer;
