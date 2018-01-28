export const FETCH_ARTISTS = 'FETCH_ARTISTS';

export function fetchArtists(api, successRspText) {
  fetch(`${__API_BASE__}/${api}`)
    .then(response => {

      return {
        type: FETCH_ARTISTS,
        payload: response
      }
      // response.json().then(responseJson => {
      //   return {
      //     type: FETCH_ARTISTS,
      //     payload: responseJson
      //   }
      // })
      // .catch(err => handleError(err));



    })
    .catch(err => handleError(err));
}

const handleError = err => {
  return {
    type: FETCH_ARTISTS,
    payload: err
  }
  console.error(err);
};
