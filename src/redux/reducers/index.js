import { combineReducers } from 'redux';
import GridReducer from './reducer-grid';
import ArtistsReducer from './reducer-artists';
import AlbumsReducer from './reducer-albums';

const rootReducer = combineReducers({
  gridInfo: GridReducer,
  artists: ArtistsReducer,
  albums: AlbumsReducer
});

export default rootReducer;
