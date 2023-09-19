<script>
  import MyCard from "$lib/components/myCard.svelte";
  import CardHolder from "$lib/images/pickCards/CardHolder.png";
  import InfoText from "$lib/images/pickCards/infotext.png";
  import { onMount, tick } from "svelte";
  import { tweened } from "svelte/motion";
  import { cubicOut } from "svelte/easing";
  import { dndzone, SOURCES, TRIGGERS } from "svelte-dnd-action";
  import { flip } from "svelte/animate";
  import { press, tap } from "svelte-gestures";
  import MyButton from "$lib/components/myButton.svelte";
  import { gsap } from "gsap";
  import { CustomEase } from "gsap/all";
  import { fade } from "svelte/transition";
  import mousePosition from "$lib/stores/mousePosition";
  import gameState from "$lib/stores/gameState";
  import Icon from "@iconify/svelte";

  gsap.registerPlugin(CustomEase);

  CustomEase.create(
    "custom",
    "M0,0 C0.133,-0.351 0.736,1.062 0.868,1.074 0.948,1.081 0.978,1 1,1 "
  );

  const flipDurationMs = 200;

  /**
   * @type {HTMLDivElement}
   */
  let scrollContainer;

  /**
   * Current scroll percentage
   * @type {number}
   */
  let scrollPercentage = 0;
  const centerPos = { x: 960, y: -1605 };

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

  function toggleCardHolder() {
    if ($cardHolderTweened == 1) {
      cardHolderTweened.set(0);
      isCardHolderOn = false;
      CardsInGroundDragDisabled = true;
      CardsInHolderDragDisabled = true;
    } else {
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
    $gameState.cardsInGround = newItems;
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
    $gameState.cardsInGround = newItems;
    // Ensure dragging is stopped on drag finish via pointer (mouse, touch)
    if (source === SOURCES.POINTER) {
      CardsInGroundDragDisabled = true;
    }
  }
  /**
   * @param {any} e
   */
  async function CardsInGroundStartDrag(e) {
    CardsInGroundDragDisabled = false;

    await tick();
    // trigger mouse down event for the target on the mouse position of the screen
    let mouseDownEvent = new MouseEvent("mousedown", {
      clientX: $mousePosition.x,
      clientY: $mousePosition.y,
    });

    e.target.dispatchEvent(mouseDownEvent);
  }

  /**
   * DND
   * @param e {any}
   */
  function handleCardsInHolder(e) {
    $gameState.cardsInHolder = e.detail.items;
  }

  /**
   * DND
   * @param e {any}
   */
  function handleFinalizeCardsInHolder(e) {
    $gameState.cardsInHolder = e.detail.items;

    if ($gameState.cardsInHolder.length === 5) {
      toggleCardHolder();
    }
  }

  let scrollPerObj = { value: 0.5 };
  onMount(() => {
    scrollContainer.scrollLeft =
      scrollContainer.scrollWidth - scrollContainer.clientWidth;
    // animate from left to right
    gsap.from(scrollPerObj, {
      value: 1,
      duration: 1.5,
      ease: "custom",
      onUpdate: () => {
        scrollContainer.scrollLeft =
          (scrollContainer.scrollWidth - scrollContainer.clientWidth) *
          scrollPerObj.value;
      },
    });
  });

  /**
   * @param {HTMLDivElement} node
   * @param {number} delay
   */
  function scaleCard(node, delay) {
    // set duration 300ms
    node.style.transition = "transform 300ms";
    /**
     * @type {number | undefined}
     */
    let ref;
    /**
     * @type {gsap.core.Tween}
     */
    let animateProgress;
    /**
     * @type {any}
     */
    let progressBar;
    node.addEventListener("touchstart", () => {
      // get first child value

      progressBar = node.firstChild;
      let value = { value: 0 };

      // animate progressBar value from 0 to 100 in 300ms
      animateProgress = gsap.to(value, {
        value: 100,
        duration: 0.3,
        onUpdate: () => {
          // set progressBar value
          progressBar.value = value.value;
        },
      });

      ref = setTimeout(() => {
        node.style.transform = "scale(0.9)";
      }, delay);
    });
    node.addEventListener("touchmove", () => {
      clearTimeout(ref);
      animateProgress.kill();
      progressBar.value = 0;
      node.style.transform = "scale(1)";
    });
    node.addEventListener("touchend", () => {
      clearTimeout(ref);
      animateProgress.kill();
      progressBar.value = 0;
      node.style.transform = "scale(1)";
    });
  }
</script>

<main
  in:fade={{ duration: 1000, delay: 100 }}
  out:fade={{ duration: 400 }}
  class="w-full h-full flex flex-col justify-center items-center relative overflow-clip"
>
  <div
    class="absolute left-1/2 bottom-[280px] translate-x-[-50%] flex space-x-2 justify-center items-center pr-4"
  >
    <Icon
      class=" relative top-[-2px]"
      icon="teenyicons:bulb-off-outline"
      color="#ffffff"
      width="48"
      height="48"
    />
    <div class=" font-[300] text-[32px] text-white">
      點擊興趣卡看詳細說明，<b>長按</b>將想要的卡牌拖至卡匣即可收集
    </div>
  </div>
  <div
    bind:this={scrollContainer}
    on:scroll={handleScroll}
    class=" circle-container flex w-full h-full relative top-[-100px] items-center space-x-[100px] overflow-x-scroll no-scrollbar"
  >
    <div class="min-w-[600px] w-[600px] h-[390px] relative m-4 opacity-0" />
    <section
      class=" space-x-[100px] flex"
      use:dndzone={{
        items: $gameState.cardsInGround,
        dragDisabled: CardsInGroundDragDisabled,
        flipDurationMs,
        dropTargetStyle: {},
      }}
      on:consider={handleConsiderCardsInGround}
      on:finalize={handleFinalizeCardsInGround}
    >
      {#each $gameState.cardsInGround as card (card.id)}
        <div
          class="min-w-[280px] w-[280px] h-[390px] relative m-4"
          animate:flip={{ duration: flipDurationMs }}
          use:press={{ timeframe: 300, triggerBeforeFinished: true }}
          on:press={CardsInGroundStartDrag}
          use:scaleCard={300}
        >
          <progress
            class="absolute top-0 left-[50%] translate-x-[-50%] progress w-56"
            value="0"
            max="100"
          />
          <MyCard
            cardId={card.id}
            flipplable={true}
            className=" h-[390px] rounded-[24px] "
          />
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
      class=" absolute top-[23px] left-[26px] flex items-center w-[1410px] h-[390px] px-[10px] space-x-[16px]"
      use:dndzone={{
        items: $gameState.cardsInHolder,
        flipDurationMs,
        dragDisabled: CardsInHolderDragDisabled,
        dropTargetStyle: {},
      }}
      on:consider={handleCardsInHolder}
      on:finalize={handleFinalizeCardsInHolder}
    >
      {#each $gameState.cardsInHolder as card (card.id)}
        <div animate:flip={{ duration: flipDurationMs }} use:scaleCard={10}>
          <MyCard
            cardId={card.id}
            className=" w-[240px] h-[330px] rounded-[24px]"
          />
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
        <MyButton
          onclick={() => {
            gameState.reset();
            toggleCardHolder();
          }}>重新選擇</MyButton
        >
        <a href="/instruction"> <MyButton>確認卡牌</MyButton></a>
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
