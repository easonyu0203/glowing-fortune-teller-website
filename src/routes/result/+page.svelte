<script>
  import { fly, fade } from "svelte/transition";

  /** @type {import('./$types').PageData} */
  export let data;
</script>

<main
  in:fly={{ duration: 500 }}
  out:fly={{ duration: 500 }}
  class="w-full h-full flex flex-col absolute justify-center items-center"
>
  <h1>分析結果！！！！！！</h1>
</main>
