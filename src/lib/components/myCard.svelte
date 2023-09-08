<script>
  export let className = "";
  export let cardId = 1;
  import card1 from "$lib/images/cards/1益智.jpg";
  import card2 from "$lib/images/cards/2閱讀.jpg";
  import card3 from "$lib/images/cards/3命運.jpg";
  import card4 from "$lib/images/cards/4畫畫.jpg";
  import card5 from "$lib/images/cards/5攝影.jpg";
  import card6 from "$lib/images/cards/6逛街.jpg";
  import card7 from "$lib/images/cards/7運動.jpg";
  import card8 from "$lib/images/cards/8美食.jpg";
  import card9 from "$lib/images/cards/９手作.jpg";
  import card10 from "$lib/images/cards/10進步強化.jpg";
  import card11 from "$lib/images/cards/11動物.jpg";
  import card12 from "$lib/images/cards/12電動.jpg";
  import card13 from "$lib/images/cards/13旅遊.jpg";
  import card14 from "$lib/images/cards/14電視.jpg";
  import card15 from "$lib/images/cards/15漫畫.jpg";
  import card16 from "$lib/images/cards/16網路.jpg";
  import card17 from "$lib/images/cards/17家人.jpg";
  import card18 from "$lib/images/cards/18聽歌.jpg";

  let cards = [
    card1,
    card2,
    card3,
    card4,
    card5,
    card6,
    card7,
    card8,
    card9,
    card10,
    card11,
    card12,
    card13,
    card14,
    card15,
    card16,
    card17,
    card18,
  ];
  let src = 1 <= cardId && cardId <= 18 ? cards[cardId - 1] : null;
</script>

{#if src}
  <img
    {src}
    alt="card"
    class={className + " shadow-[0_0_15px_0_rgba(9,33,40,0.75)]"}
  />
{:else}
  <div class={className + " opacity-0"} />
{/if}
