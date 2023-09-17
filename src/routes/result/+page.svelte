<script>
  import { fly, fade } from "svelte/transition";
  import resultText from "$lib/images/result/resultText.png";
  import Icon from "@iconify/svelte";

  /** @type {import('./$types').PageData} */
  export let data;
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
      <div class="w-[122px] h-[122px] bg-black text-white">qr code</div>
    </div>
  </div>

  <div class=" flex overflow-x-scroll w-screen space-x-10 px-14">
    {#each [1, 2, 3] as tt}
      <div class=" flex flex-col w-[1640px] h-[680px]">
        <div
          class=" w-full flex-grow-0 h-[109px] rounded-t-[24px] bg-[#F8D170] text-[48px] flex items-center justify-center font-bold text-[#551A19]"
        >
          研究型
        </div>
        <div class=" flex-grow bg-[#FFEBC8] rounded-b-[24px] p-6">
          <div class=" text-[#551A19] text-[40px] my-2">
            <b>特徵</b>：理性、邏輯、學習
          </div>
          <div class=" flex">
            {#each [1, 2, 3, 4] as tmp}
              <div
                class=" flex flex-col w-[374px] h-[440px] bg-[#FEF8EB] p-7 m-4 rounded-[24px] shadow-[0_2px_10px_0_rgba(9,33,40,0.75)]"
              >
                <div class=" text-[#551A19] text-[40px] font-bold">
                  類型說明
                </div>
                <p class=" text-[#6F3D0F] text-[24px]">
                  究型的你聦明、理性、邏輯分析強，很喜歡動腦思考與學習，這讓你心中覺得很踏實。你會嘗試不同的方式去解開難題或困難，發現答案的時候會很有成就感。不妨多運用上述的特點來克服你正面臨的困難喔！
                </p>
              </div>
            {/each}
          </div>
        </div>
      </div>
    {/each}
  </div>

  <div class=" flex space-x-8 pb-8">
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
      class=" text-[#6B350D] w-[288px] h-[107px] text-[40px] font-[600] border-[5px] rounded-[24px] border-[#6B350D] bg-gradient-to-b from-[#FFD78A] from-65% to-[#C98A2C]"
      >重新測驗</button
    >
    <button
      class=" text-[#6B350D] w-[288px] h-[107px] text-[40px] font-[600] border-[5px] rounded-[24px] border-[#6B350D] bg-gradient-to-b from-[#FFD78A] from-65% to-[#C98A2C]"
      >完成體驗</button
    >
  </div>
</main>
