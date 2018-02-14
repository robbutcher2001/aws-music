import { combineReducers } from 'redux';
import PickerReducer from './reducer-picker';
import QueueReducer from './reducer-queue';
import GetTrackReducer from './reducer-get-track';

const rootReducer = combineReducers({
  picker: PickerReducer,
  queue: QueueReducer,
  playing: GetTrackReducer
});

export default rootReducer;
