<script>
  import MyButton from "$lib/components/myButton.svelte";
  import text from "$lib/images/homePage/text.png";
  import MyCard from "$lib/components/myCard.svelte";
  import { fade, fly } from "svelte/transition";
</script>

<div
  class="w-full h-full flex flex-col items-center justify-center absolute overflow-clip"
>
  <div in:fade={{ duration: 1000 }} out:fade={{ duration: 300 }}>
    <img src={text} alt="text" />
  </div>
  <div in:fade={{ duration: 1000 }} out:fade={{ duration: 300 }}>
    <MyButton><a href="/intro">開始逐夢旅程</a></MyButton>
  </div>

  <!-- cards -->

  <div
    class=" absolute top-[350px] left-[-250px] rotate-[30deg] w-[480px] rounded-[24px]"
    transition:fly={{ x: -500, duration: 1500 }}
  >
    <MyCard cardId={2} className=" rounded-[24px]" />
  </div>
  <div
    class=" absolute top-[-170px] left-[-200px] rotate-[-44deg] w-[480px] rounded-[24px]"
    transition:fly={{ x: -500, duration: 1500 }}
  >
    <MyCard cardId={1} className=" rounded-[24px]" />
  </div>

  <div
    class=" absolute top-[300px] right-[-200px] rotate-[10deg] w-[480px] rounded-[24px]"
    transition:fly={{ x: 500, duration: 1500 }}
  >
    <MyCard cardId={3} className=" rounded-[24px]" />
  </div>
  <div
    class=" absolute top-[-170px] right-[-250px] rotate-[-136deg] w-[480px] rounded-[24px]"
    transition:fly={{ x: -500, duration: 1500 }}
  >
    <MyCard cardId={4} className=" rounded-[24px]" />
  </div>

  <div
    class=" absolute bottom-[-580px] right-[400px] rotate-[13deg] w-[480px] rounded-[24px]"
    transition:fly={{ y: 500, duration: 1500 }}
  >
    <MyCard cardId={5} className=" rounded-[24px]" />
  </div>
</div>
