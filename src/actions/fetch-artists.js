import axios from 'axios';
export const FETCH_ARTISTS = 'FETCH_ARTISTS';

export function fetchArtists(api, successRspText) {
  const request = axios.get(`${__API_BASE__}/${api}`);

  return {
    type: FETCH_ARTISTS,
    payload: request
  }

  // fetch(`${__API_BASE__}/${api}`)
  //   .then(response => {
  //     response.json().then(responseJson => {
  //       return {
  //         type: FETCH_ARTISTS,
  //         payload: responseJson
  //       }
  //     })
  //     .catch(err => handleError(err));
  //   })
  //   .catch(err => handleError(err));
}
//
// const handleError = err => {
//   return {
//     type: FETCH_ARTISTS,
//     payload: err
//   }
//   console.error(err);
// };
