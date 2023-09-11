<script>
  import { goto } from "$app/navigation";
  import MyButton from "$lib/components/myButton.svelte";
  import START from "$lib/images/intro/START.png";
  import { fade } from "svelte/transition";
</script>

<main
  in:fade={{ duration: 1000, delay: 500 }}
  out:fade={{ duration: 400, delay: 2000 }}
  class="w-full h-full flex flex-col absolute justify-center space-y-[100px] items-center"
>
  <div
    class=" font-[300] flex flex-col justify-center items-center text-white text-[40px] space-y-5"
  >
    <p>一樣的興趣，喜歡的理由因人而異，</p>
    <p>接下來請針對每個興趣活動，</p>
    <p>车少選擇6個你喜歡它的原因。</p>
  </div>

  <button
    on:click={() => {
      goto("/questions");
    }}
    class=" absolute bottom-[200px] left-/12 my-bnt mt-[80px] w-[208px] font-[600] h-[107px] bg-[#FFD78A] rounded-[32px] shadow-[0_12px_15px_0_rgba(9,33,40,0.8)] border-[#6F3D0F] border-[5px] text-[#6B350D] text-4xl"
  >
    開始
  </button>
</main>

<style>
  .my-bnt {
    background: linear-gradient(
      180deg,
      rgba(255, 215, 138, 1) 52%,
      rgba(201, 138, 44, 1) 100%
    );
  }
</style>
