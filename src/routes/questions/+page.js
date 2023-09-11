import data from "$lib/bookData.json";

/** @type {import('./$types').PageLoad} */
export async function load() {
  return data;
}

export const ssr = false;
