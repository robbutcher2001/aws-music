export const FETCH_ALBUMS = 'FETCH_ALBUMS'; //TODO: move to constants

export function fetchAlbums(api) {
  //TODO: move async operation to middleware by using module like axios
  const request = fetch(`${__API_BASE__}/${api}`)
    .then(response => response.json())
    .catch(err => { err });

  return {
    type: FETCH_ALBUMS,
    payload: request
  }
}
//
// const handleError = err => {
//   return {
//     type: FETCH_ALBUMS,
//     payload: err
//   }
//   console.error(err);
// };
