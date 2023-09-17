<script>
  import START from "$lib/images/intro/START.png";
  import { fade } from "svelte/transition";
</script>

<main
  in:fade={{ duration: 1000, delay: 500 }}
  out:fade={{ duration: 400 }}
  class="w-full h-full flex flex-col absolute justify-center items-center"
>
  <div
    class=" font-[300] flex flex-col justify-center items-center text-white text-[40px] space-y-5"
  >
    <p>你留意過，自己喜歡從事哪些興趣活動嗎？</p>
    <p>但你知道嗎？就算是同一項興趣活動，每個人喜歡的原因也會有所不同喔！</p>
    <p>選出你平常喜歡的興趣活動，</p>
    <p>一起從再尋常不過的日常生活中，探索自己的生涯方向吧！</p>
  </div>

  <a
    href="/pick-cards"
    id="star-btn"
    class=" absolute bottom-[200px] left-1/2 translate-x-[-50%]"
  >
    <img src={START} alt="START" />
  </a>
</main>
