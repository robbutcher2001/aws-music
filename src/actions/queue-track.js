export const QUEUE_TRACK = 'QUEUE_TRACK'; //TODO: move to constants

export function queueTrack(artistId, albumId, track) {
  track.artistId = artistId;
  track.albumId = albumId;

  return {
    type: QUEUE_TRACK,
    payload: track
  }
}
