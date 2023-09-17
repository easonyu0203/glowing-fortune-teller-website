import gameState from "$lib/stores/gameState";
import { get } from "svelte/store";
import typeData from "$lib/typeData.json";

/** @type {import('./$types').PageLoad} */
export async function load() {
  //get game state value
  const gs = get(gameState);

  // caculate the most 3 common values in choosedTypesList
  const typeCountMap = new Map();
  for (const type of gs.choosedTypesList) {
    typeCountMap.set(type, (typeCountMap.get(type) || 0) + 1);
  }
  const typeCountArray = Array.from(typeCountMap.entries());
  typeCountArray.sort((a, b) => b[1] - a[1]);
  /**
   * @type {1|2|3|4|5|6|7|8|9|10|11|12[]}
   */
  const mostCommonTypes = typeCountArray.slice(0, 3).map((v) => v[0]);

  // return the most common types
  return {
    typeData,
    mostCommonTypes,
  };
}

export const ssr = false;
