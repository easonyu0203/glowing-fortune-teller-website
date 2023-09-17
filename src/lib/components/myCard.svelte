<script>
  import { fade } from "svelte/transition";
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
  import cardInfoBack from "$lib/images/pickCards/CardInfoBack.png";
  import { tap } from "svelte-gestures";

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

  let cardInfos = [
    {
      title: "益智",
      content:
        "下棋、觀棋、桌遊、數獨、麻將、撲克牌、七巧板、益智遊戲、動腦活動、密室逃脫",
    },
    {
      title: "閱讀",
      content: "閱讀/看書",
    },
    {
      title: "運勢",
      content: "星座/風水/命理/塔羅牌",
    },
    {
      title: "畫畫",
      content: "繪畫/電腦繪圖/插畫/塗鴉",
    },
    {
      title: "拍攝",
      content: "拍照/攝影",
    },
    {
      title: "逛街",
      content: "繪畫/電腦繪圖/插畫/塗鴉",
    },
    {
      title: "運動",
      content: "運動/健身/極限運動/體能競賽/跳舞",
    },
    {
      title: "美食",
      content: "吃東西/煮飯菜/烹飪",
    },
    {
      title: "手作",
      content: "手工製作物品/手工藝/勞作",
    },
    {
      title: "進步/強化",
      content: "聽講座/讀書會/參加課程/各方面的自我提升",
    },
    {
      title: "動物",
      content: "餵養動物/和動物互動",
    },
    {
      title: "電玩",
      content: "打電動/打怪/手機遊戲",
    },
    {
      title: "旅行",
      content: "旅遊/背包客",
    },
    {
      title: "電影/節目",
      content: "看電影/看影集/追劇/看電視/數位電視/聽廣播/網路頻道",
    },
    {
      title: "漫畫",
      content: "看漫畫/動漫",
    },
    {
      title: "網路",
      content: "上網/滑手機/直播",
    },
    {
      title: "家人",
      content: "家庭活動",
    },
    {
      title: "聽歌",
      content: "聽音樂",
    },
  ];

  export let className = "";
  export let cardId = 1;
  export let flipplable = false;
  let flipped = false;

  let src = 1 <= cardId && cardId <= 18 ? cards[cardId - 1] : null;
  let cardInfo = cardId <= 18 ? cardInfos[cardId - 1] : null;
</script>

{#if src}
  <div
    use:tap={{ timeframe: 300 }}
    on:tap={() => {
      if (flipplable) {
        flipped = !flipped;
      } else {
        flipped = false;
      }
    }}
    transition:fade={{ duration: 1000 }}
    class={className + " relative  card"}
  >
    <div class:flipped class={"inner"}>
      <div class="front">
        <img
          {src}
          alt="card"
          class={className + " shadow-[0_0_15px_0_rgba(9,33,40,0.75)]"}
        />
      </div>
      <div class={className + " flex flex-col back "}>
        <img src={cardInfoBack} alt="ccc" class={className + " absolute"} />
        <div class=" absolute flex flex-col justify-end h-full pb-6 px-8">
          <div
            class=" text-[#6F3D0F] text-[24px] flex-grow flex justify-center items-center py-8"
          >
            {cardInfo?.content}
          </div>
          <div class=" text-white text-[30px] flex-grow-0">
            {cardInfo?.title}
          </div>
        </div>
      </div>
    </div>
  </div>
{:else}
  <div class={className + " opacity-0"} />
{/if}

<style>
  .card {
    background-color: transparent;
    perspective: 1000px;
    margin: 1rem;
  }
  .inner {
    position: relative;
    width: 100%;
    height: 100%;
    text-align: center;
    transition: transform 0.8s;
    transform-style: preserve-3d;
  }
  .flipped {
    transform: rotateY(180deg);
  }
  .front,
  .back {
    position: absolute;
    width: 100%;
    height: 100%;
    -webkit-backface-visibility: hidden; /* Safari */
    backface-visibility: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
  }

  .back {
    transform: rotateY(180deg);
  }
</style>
