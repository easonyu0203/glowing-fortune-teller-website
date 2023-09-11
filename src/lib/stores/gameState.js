import { writable } from "svelte/store";

const gameState = writable({
  /**
   * @type {{id: number}[]}
   */
  cardsInGround: [],
  /**
   * The card id from 1 to 18
   * @type {{id: number}[]}
   */
  cardsInHolder: [],
  /**
   * Types list which aggregate from all the option which user choosed
   * @type {number[]}
   */
  choosedTypesList: [],
});

gameState.update((gs) => {
  for (let i = 1; i <= 18; i++) {
    gs.cardsInGround.push({ id: i });
  }
  gs.cardsInHolder = [{ id: 7 }, { id: 4 }, { id: 5 }, { id: 6 }, { id: 7 }];
  return gs;
});

export default {
  subscribe: gameState.subscribe,
  set: gameState.set,
  reset: () => {
    gameState.update((gs) => {
      gs.cardsInGround = [];
      for (let i = 1; i <= 18; i++) {
        gs.cardsInGround.push({ id: i });
      }
      gs.cardsInHolder = [];
      gs.choosedTypesList = [];
      return gs;
    });
  },
};
