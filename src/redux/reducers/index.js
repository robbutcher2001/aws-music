import { combineReducers } from 'redux';
import GridReducer from './reducer-grid';
import ArtistsReducer from './reducer-artists';

const rootReducer = combineReducers({
  gridInfo: GridReducer,
  artists: ArtistsReducer
});

export default rootReducer;
