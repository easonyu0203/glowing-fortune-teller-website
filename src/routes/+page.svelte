<script>
  import { goto } from "$app/navigation";
  import MyButton from "$lib/components/myButton.svelte";
  import { onMount } from "svelte";
  onMount(() => {
    goto("/start");
  });
</script>

<MyButton><a href="/start">開始逐夢旅程</a></MyButton>
