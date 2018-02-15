import { combineReducers } from 'redux';
import PickerReducer from './reducer-picker';
import QueueReducer from './reducer-queue';
import GetTrackLocationReducer from './reducer-get-track-location';
import GetTrackMetaReducer from './reducer-get-track-meta';

const rootReducer = combineReducers({
  picker: PickerReducer,
  queue: QueueReducer,
  playingLocation: GetTrackLocationReducer,
  playingMeta: GetTrackMetaReducer
});

export default rootReducer;
