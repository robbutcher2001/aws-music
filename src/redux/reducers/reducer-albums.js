import { FETCH_ALBUMS } from '../../actions/fetch-albums';

const arrayToObject = (arr, keyField) =>
  Object.assign({}, ...arr.map(item => ({ [item[keyField]]: item })))

export default function(state = [], action) {
  switch (action.type) {
  case FETCH_ALBUMS:
    return action.payload.data;

    default:
      return state;
  }
}
