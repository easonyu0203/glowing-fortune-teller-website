<script>
  import "../app.css";
  import northPole from "$lib/images/northPole.png";
  import bg from "$lib/images/bg.png";
  import EarthLongLatitude from "$lib/components/earthLongLatitude.svelte";
  import { gsap } from "gsap";
  import { CustomEase } from "gsap/all";
  import { onMount } from "svelte";
  import gameState from "$lib/stores/gameState";
  import { goto } from "$app/navigation";

  gsap.registerPlugin(CustomEase);
  document.addEventListener("contextmenu", function (e) {
    e.preventDefault();
  });

  const waitInMin = 1;

  onMount(() => {
    // set timer if not have touchstart event for 1 min, goto '/'
    let timer = setTimeout(() => {
      gameState.reset();
      goto("/");
    }, 60000 * waitInMin);
    document.addEventListener("touchstart", () => {
      console.log("clear");
      clearTimeout(timer);
      timer = setTimeout(() => {
        gameState.reset();
        goto("/");
      }, 60000 * waitInMin);
    });
  });
</script>

<svelte:head>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" />
  <link
    href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@100;200;300;400;500;600&display=swap"
    rel="stylesheet"
  />
</svelte:head>

<main class="w-screen h-screen absolute bg-slate-800">
  <img src={bg} alt="bg" class="absolute top-0 left-0" />

  <EarthLongLatitude />
  <div
    class="absolute top-0 left-1/2 transform -translate-x-1/2 w-[1920px] h-[160px]"
  >
    <img src={northPole} alt="northPole" />
  </div>
</main>

<main class="w-screen h-screen absolute bg-transparent">
  <slot />
</main>

<style>
  :root {
    font-family: "Noto Sans TC", sans-serif;
  }
</style>
