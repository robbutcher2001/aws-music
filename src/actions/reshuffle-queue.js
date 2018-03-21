export const RESHUFFLE_QUEUE = 'RESHUFFLE_QUEUE'; //TODO: move to constants

export function reshuffleQueue(track) {
  return {
    type: RESHUFFLE_QUEUE,
    payload: track
  }
}
