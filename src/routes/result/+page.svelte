<script>
  import { fly, fade } from "svelte/transition";
  import resultText from "$lib/images/result/resultText.png";
  import Icon from "@iconify/svelte";
  import gameState from "$lib/stores/gameState";
  import { goto } from "$app/navigation";
  import MyQrCode from "$lib/components/myQrCode.svelte";
  /** @type {import('./$types').PageData} */
  export let data;

  let typeIndex = 0;
</script>

<main
  in:fly={{ duration: 500 }}
  out:fly={{ duration: 500 }}
  class="w-full h-full flex flex-col absolute justify-around items-center"
>
  <div class=" flex justify-between items-center w-full px-16 pt-8">
    <img src={resultText} alt="result text" />
    <div class=" flex space-x-8">
      <div class=" felx flex-col relative top-2 text-white text-[32px]">
        <div>掃描下載</div>
        <div>分析說明</div>
      </div>
      <MyQrCode index={data.mostCommonTypes[typeIndex]} />
    </div>
  </div>

  <div
    on:scroll={(e) => {
      typeIndex = Math.round(
        e.currentTarget.scrollLeft / e.currentTarget.clientWidth
      );
    }}
    class=" flex overflow-x-scroll carousel carousel-center max-w-[1850px] space-x-5 px-14 py-4"
  >
    {#each data.mostCommonTypes as idx}
      <div class=" carousel-item flex flex-col w-[1640px] h-[680px]">
        <div
          class=" w-full flex-grow-0 h-[109px] rounded-t-[24px] bg-[#F8D170] text-[48px] flex items-center justify-center font-bold text-[#551A19]"
        >
          {data.typeData[idx].type}
        </div>
        <div class=" flex-grow bg-[#FFEBC8] rounded-b-[24px] p-6">
          <div class=" text-[#551A19] text-[40px] my-2">
            <b>特徵</b>：{data.typeData[idx].特質}
          </div>
          <div class=" flex">
            {#each data.typeData[idx].entries as entry}
              <div
                class=" flex flex-col w-[374px] h-[440px] space-y-1 bg-[#FEF8EB] px-6 py-4 m-4 rounded-[24px] shadow-[0_2px_10px_0_rgba(9,33,40,0.75)]"
              >
                <div class=" text-[#551A19] text-[36px] font-bold">
                  {entry[0]}
                </div>
                <p class=" text-[#6F3D0F] overflow-y-scroll text-[23px]">
                  {@html entry[1]}
                </p>
              </div>
            {/each}
          </div>
        </div>
      </div>
    {/each}
  </div>

  <div class=" flex space-x-[150px] pb-8 w-full items-center justify-center">
    <div class="flex space-x-2 justify-center items-center pr-4">
      <Icon
        class=" relative top-[-2px]"
        icon="teenyicons:bulb-off-outline"
        color="#ffffff"
        width="48"
        height="48"
      />
      <div class=" font-[400] text-[32px] text-white">
        分析結果將顯示最符合的 3 個類型，可以透過右上角 QRcode 下載說明呦！
      </div>
    </div>
    <button
      on:click={() => {
        gameState.reset();
        goto("start");
      }}
      class=" text-[#6B350D] w-[288px] h-[107px] text-[40px] font-[600] border-[5px] rounded-[24px] border-[#6B350D] bg-gradient-to-b from-[#FFD78A] from-65% to-[#C98A2C]"
      >完成體驗</button
    >
  </div>
</main>
