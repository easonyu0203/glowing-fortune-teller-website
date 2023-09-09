<script>
  import MyCard from "$lib/components/myCard.svelte";
  import CardHolder from "$lib/images/pickCards/CardHolder.png";
  import { onMount } from "svelte";
  import { tweened } from "svelte/motion";
  import { cubicOut } from "svelte/easing";
  import { dndzone, SOURCES, TRIGGERS } from "svelte-dnd-action";
  import { flip } from "svelte/animate";
  import { longpress } from "$lib/longpress";
  import MyButton from "$lib/components/myButton.svelte";
  const flipDurationMs = 200;

  /**
   * @type {{id: number}[]}
   */
  let cardsInGround = [];
  /**
   * The card id from 1 to 18
   * @type {{id: number}[]}
   */
  let cardsInHolder = [{ id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }];

  for (let i = 1; i <= 18; i++) {
    cardsInGround.push({ id: i });
  }

  /**
   * @type {HTMLDivElement}
   */
  let scrollContainer;

  /**
   * Current scroll percentage
   * @type {number}
   */
  let scrollPercentage = 0;

  /**
   * Compute the scroll percentage based on scroll position
   * @param {Event} event - The scroll event
   */
  function handleScroll(event) {
    const el = event.target;
    // @ts-ignore
    const totalScrollable = el.scrollWidth - el.clientWidth;
    // @ts-ignore
    scrollPercentage = (el.scrollLeft / totalScrollable) * 100;
  }

  let isCardHolderOn = false;
  let cardHolderTweened = tweened(1, {
    delay: 100,
    duration: 1000,
    easing: cubicOut,
  });
  function toggleCardHolder(on = 1) {
    if ($cardHolderTweened == on) {
      cardHolderTweened.set(0);
      isCardHolderOn = false;
      CardsInGroundDragDisabled = true;
      CardsInHolderDragDisabled = true;
    } else if ($cardHolderTweened == on) {
      cardHolderTweened.set(1);
      isCardHolderOn = true;
      CardsInGroundDragDisabled = false;
      CardsInHolderDragDisabled = false;
    }
  }

  let CardsInGroundDragDisabled = true;
  let CardsInHolderDragDisabled = false;

  // @ts-ignore
  function handleConsiderCardsInGround(e) {
    const {
      items: newItems,
      info: { source, trigger },
    } = e.detail;
    cardsInGround = newItems;
    // Ensure dragging is stopped on drag finish via keyboard
    if (source === SOURCES.KEYBOARD && trigger === TRIGGERS.DRAG_STOPPED) {
      CardsInGroundDragDisabled = true;
    }
  }
  /**
   * @param {{ detail: { items: any; info: { source: any; }; }; }} e
   */
  function handleFinalizeCardsInGround(e) {
    const {
      items: newItems,
      info: { source },
    } = e.detail;
    cardsInGround = newItems;
    // Ensure dragging is stopped on drag finish via pointer (mouse, touch)
    if (source === SOURCES.POINTER) {
      CardsInGroundDragDisabled = true;
    }
  }
  /**
   * @param {any} e
   */
  function CardsInGroundStartDrag(e) {
    console.log("star");
    CardsInGroundDragDisabled = false;
  }

  /**
   * DND
   * @param e {any}
   */
  function handleCardsInHolder(e) {
    cardsInHolder = e.detail.items;
  }

  /**
   * DND
   * @param e {any}
   */
  function handleFinalizeCardsInHolder(e) {
    cardsInHolder = e.detail.items;

    if (cardsInHolder.length === 5) {
      toggleCardHolder();
    }
  }

  onMount(() => {
    scrollContainer.scrollLeft =
      (scrollContainer.scrollWidth - scrollContainer.clientWidth) / 2;
    // toggleCardHolder();
  });
</script>

<main
  class="w-full h-full flex flex-col justify-center items-center relative overflow-clip"
>
  <div
    bind:this={scrollContainer}
    on:scroll={handleScroll}
    class=" circle-container flex w-full h-full relative items-center space-x-[100px] overflow-x-scroll no-scrollbar"
  >
    <div class="min-w-[600px] w-[600px] h-[390px] relative m-4 opacity-0" />
    <section
      class=" space-x-[100px] flex"
      use:dndzone={{
        items: cardsInGround,
        dragDisabled: CardsInGroundDragDisabled,
        flipDurationMs,
      }}
      on:consider={handleConsiderCardsInGround}
      on:finalize={handleFinalizeCardsInGround}
    >
      {#each cardsInGround as card (card.id)}
        <div
          class="min-w-[280px] w-[280px] h-[390px] relative m-4"
          animate:flip={{ duration: flipDurationMs }}
          use:longpress
          on:long={CardsInGroundStartDrag}
        >
          <MyCard cardId={card.id} className=" h-[390px] rounded-[24px]" />
        </div>
      {/each}
    </section>
    <div class="min-w-[600px] w-[600px] h-[390px] relative m-4 opacity-0" />
  </div>

  <div
    class="card-holder absolute top-1/2 left-1/2 w-[1494px] h-[776px]"
    style="transform: translate(-50%, {-50 + $cardHolderTweened * 90}%)"
  >
    <img src={CardHolder} class=" absolute top-0 left-0" alt="card-holder" />
    <section
      class=" absolute top-[24px] left-[41px] flex items-center w-[1410px] h-[390px] px-[10px] space-x-[51px]"
      use:dndzone={{
        items: cardsInHolder,
        flipDurationMs,
        dragDisabled: CardsInHolderDragDisabled,
      }}
      on:consider={handleCardsInHolder}
      on:finalize={handleFinalizeCardsInHolder}
    >
      {#each cardsInHolder as card (card.id)}
        <div animate:flip={{ duration: flipDurationMs }}>
          <MyCard cardId={card.id} className=" h-[330px] rounded-[24px]" />
        </div>
      {/each}
    </section>
    <div
      class=" absolute left-[41px] bottom-[50px] w-[1410px] flex flex-col items-center justify-center"
    >
      <div class=" text-[#FFE9D4] text-[40px] font-[300]">
        確認興趣卡之後，一起來探究「為什麼」喜歡這5項興趣吧！
      </div>
      <div class=" flex items-center justify-center space-x-[100px]">
        <MyButton>重新選擇</MyButton>
        <MyButton>確認卡牌</MyButton>
      </div>
    </div>
  </div>
</main>

<style>
  /* Hide scrollbar for Chrome, Safari and Opera */
  .no-scrollbar::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for IE, Edge and Firefox */
  .no-scrollbar {
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }
</style>
