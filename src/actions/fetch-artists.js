export const FETCH_ARTISTS = 'FETCH_ARTISTS'; //TODO: move to constants

export function fetchArtists(api) {
  //TODO: move async operation to middleware by using module like axios
  const request = fetch(`${__API_BASE__}/${api}`)
    .then(response => response.json())
    .catch(err => { err });

  return {
    type: FETCH_ARTISTS,
    payload: request
  }
}
//
// const handleError = err => {
//   return {
//     type: FETCH_ARTISTS,
//     payload: err
//   }
//   console.error(err);
// };
