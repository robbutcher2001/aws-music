import { combineReducers } from 'redux';
import PickerReducer from './reducer-picker';
import QueueReducer from './reducer-queue';

const rootReducer = combineReducers({
  picker: PickerReducer,
  queue: QueueReducer
});

export default rootReducer;
