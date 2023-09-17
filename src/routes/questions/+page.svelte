<script>
  import { fly, fade } from "svelte/transition";
  import cardBack from "$lib/images/cards/cardBack.png";
  import Icon from "@iconify/svelte";
  import MyCard from "$lib/components/myCard.svelte";
  import Toggle from "$lib/components/questions/toggle.svelte";
  import gameState from "$lib/stores/gameState";
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import { dev } from "$app/environment";

  /** @type {import('./$types').PageData} */
  export let data;

  /**
   * @type {HTMLDivElement}
   */
  let optionsRef;

  /**
   * @type {HTMLDivElement}
   */
  let hintRef;

  let currentCardNum = 1;
  /**
   * The card id from 1 to 18
   * @type {1|2|3|4|5|6|7|8|9|10|11|12|13|14|15|16|17|18}
   */
  // @ts-ignore
  $: currentCardId = $gameState.cardsInHolder[currentCardNum - 1].id;
  /**
   * @type {{原因: string, 類型: number, isOn: boolean}[]}
   */
  // @ts-ignore
  $: currentOptions = data[currentCardId].reasons.map((e) => {
    // add isOn property
    // @ts-ignore
    e.isOn = false;
    return e;
  });
  let currentSelectCnt = 0;

  $: allowNext = dev ? currentSelectCnt >= 1 : currentSelectCnt >= 6;

  onMount(() => {
    if ($gameState.cardsInHolder.length < 5) {
      goto("pick-cards");
    }
  });
</script>

<main
  in:fly={{ duration: 1500, y: 1500 }}
  out:fly={{ duration: 1500, y: 1500 }}
  class="w-full h-full flex flex-col absolute justify-center items-center"
>
  <div class=" h-[1000px] w-[1840px] flex flex-col rounded-[24px]">
    <div
      class=" w-full h-[147px] flex-grow-0 bg-[#f4cfa1] rounded-t-[24px] text-[40px] font-[400] text-[#551A19] flex items-center justify-center"
    >
      試想你「為什麼」喜歡這個興趣活動，點選卡牌查看活動介紹，並勾選「符合」的原因。
    </div>
    <div class="w-full flex-grow bg-[#FCEED0] rounded-b-[24px] flex flex-col">
      <div class=" flex-grow flex">
        <div
          id="cards"
          class=" relative flex-grow flex justify-center items-center"
        >
          <img
            src={cardBack}
            class=" absolute rounded-2xl rotate-[20deg] w-[392px] h-[549px]"
            alt="cardBack"
          />
          <img
            src={cardBack}
            class=" absolute rounded-2xl rotate-[10deg] w-[392px] h-[549px]"
            alt="cardBack"
          />
          <img
            src={cardBack}
            class=" absolute rounded-2xl rotate-[-20deg] w-[392px] h-[549px]"
            alt="cardBack"
          />
          {#key currentCardId}
            <div
              transition:fade={{ duration: 300 }}
              class=" absolute w-[350px] h-[490px] rounded-[24px]"
            >
              <MyCard
                cardId={currentCardId}
                className=" absolute w-[350px] h-[490px] rounded-[24px]"
              />
            </div>
          {/key}
        </div>
        <div class=" flex flex-col my-[54px] mx-[47px]">
          <div
            bind:this={optionsRef}
            id="options"
            class=" p-4 w-[1088px] h-[471px] bg-[#F9DBB2] rounded-[24px] shadow-[inset_0_10px_10px_0_rgba(0,0,0,0.25)]"
          >
            {#key currentCardNum}
              <div
                in:fade={{ duration: 300 }}
                class=" w-full h-full space-y-2 overflow-y-scroll no-scrollbar overflow-x-clip"
              >
                {#each currentOptions as option}
                  <Toggle
                    on:toggle={(e) => {
                      currentSelectCnt += e.detail.amount;
                      option.isOn = e.detail.isOn;
                    }}>{option.原因}</Toggle
                  >
                {/each}
              </div>
            {/key}
          </div>
          <div
            bind:this={hintRef}
            id="option-text"
            class=" flex justify-between pt-6 text-[#63350a]"
          >
            <div class="flex space-x-2 justify-center items-center">
              <Icon
                class=" relative top-[-2px]"
                icon="teenyicons:bulb-off-outline"
                width="48"
                height="48"
              />
              <div class=" font-[400] text-[32px]">謮至小選擇6個原因喔！</div>
            </div>
            <div class=" font-[400] text-[32px]">
              巳選擇{currentSelectCnt}項
            </div>
          </div>
        </div>
      </div>
      <div
        class="flex h-[200px] items-center justify-between px-12 relative top-[-30px]"
      >
        <div class="flex">
          {#each [1, 2, 3, 4, 5] as cardNum}
            <div
              class={`w-[288px] h-[71px] border-[#63350A] border-4 font-[500] text-[32px] text-[#63350A] flex justify-center items-center
               ${
                 cardNum <= currentCardNum
                   ? "bg-gradient-to-b from-[#F9DD7C] from-80% to-[#D06B0E]"
                   : "bg-gradient-to-b from-[#D4B288] to-[#FEF8EB] to-30%"
               }`}
              style={cardNum == 1
                ? "border-top-left-radius: 24px;border-bottom-left-radius: 24px; border-right-width: 0px"
                : cardNum == 5
                ? "border-top-right-radius: 24px;border-bottom-right-radius: 24px;"
                : "border-right-width: 0px"}
            >
              卡牌 {cardNum}
            </div>
          {/each}
        </div>
        <button
          class={` w-[232px] h-[107px] text-[40px] font-[600] border-[5px] rounded-[24px] border-[#6B350D] bg-gradient-to-b ${
            allowNext
              ? "from-[#FFD78A] from-65% to-[#C98A2C] text-[#6B350D]"
              : "from-[#E3E3E3] to-[#8E8E8E] from-50% text-[#69615C]"
          }`}
          on:click={() => {
            if (allowNext) {
              // add options to game state
              let chooseTypes = currentOptions
                .filter((e) => e.isOn)
                .map((e) => e.類型);
              chooseTypes = chooseTypes.flat();

              $gameState.choosedTypesList.push(...chooseTypes);

              if (currentCardNum == 5) {
                // analyze
                goto("/loading");
              } else {
                // to next card
                currentCardNum += 1;
                currentSelectCnt = 0;
                //scroll to top
                if (optionsRef) {
                  optionsRef.scrollTop = 0;
                }
              }
            } else {
              hintRef.classList.add("animate-shake");
              setTimeout(() => {
                hintRef.classList.remove("animate-shake");
              }, 600);
            }
          }}
        >
          {currentCardNum == 5 ? "分析" : "Next"}
        </button>
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
  @keyframes shake {
    0% {
      transform: translateX(0);
    }
    20% {
      transform: translateX(-10px);
    }
    40% {
      transform: translateX(10px);
    }
    60% {
      transform: translateX(-10px);
    }
    80% {
      transform: translateX(10px);
    }
    100% {
      transform: translateX(0);
    }
  }
  @keyframes colorChange {
    0%,
    100% {
      color: initial; /* Set the text color to its initial state */
    }
    50% {
      color: rgb(201, 34, 34); /* Change the text color to red */
    }
  }

  .animate-shake {
    animation: shake 0.5s, colorChange 0.5s; /* Apply both animations */
  }
</style>
