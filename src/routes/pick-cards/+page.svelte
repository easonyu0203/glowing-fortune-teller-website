<script>
  import MyCard from "$lib/components/myCard.svelte";
  import { onMount } from "svelte";

  /**
   * The card id from 1 to 18
   * @type {number[]}
   */
  const numbersArray = [];

  for (let i = 1; i <= 18; i++) {
    numbersArray.push(i);
  }
</script>

<main class="w-full h-full flex flex-col justify-center items-center">
  <div class=" flex w-full space-x-16 overflow-scroll">
    {#each numbersArray as cardId}
      <div class="min-w-[280px] m-4">
        <MyCard {cardId} className=" rounded-[24px]" />
      </div>
    {/each}
  </div>
</main>
