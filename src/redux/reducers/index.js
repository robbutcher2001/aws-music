import { combineReducers } from 'redux';
import ArtistsReducer from './reducer-artists';

const rootReducer = combineReducers({
  artists: ArtistsReducer
});

export default rootReducer;
