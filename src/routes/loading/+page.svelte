<script>
  import cardBack from "$lib/images/cards/cardBack.png";
  import { fly, fade } from "svelte/transition";
  import gsap from "gsap";
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";

  function startShuffle() {
    const card1 = document.getElementById("card1");
    const card2 = document.getElementById("card2");

    const tl = gsap.timeline({ repeat: -1 });

    tl.to(card1, {
      x: "-100px",
      rotation: -15,
      duration: 0.5,
    })
      .to(
        card2,
        {
          x: "100px",
          rotation: 15,
          duration: 0.5,
        },
        "-=0.5"
      )
      .to(card1, {
        x: "-25px",
        y: "-20px",
        zIndex: 3,
        rotation: 0,
        duration: 0.5,
      })
      .to(
        card2,
        {
          x: "25px",
          y: "20px",

          rotation: 0,
          duration: 0.5,
        },
        "-=0.5"
      )
      .to(card1, {
        duration: 0.2,
      });
  }

  function fakeLoading() {
    gsap.to(progress, {
      value: 1,
      duration: 5,
      ease: "power",
      onUpdate: () => {
        progress = progress;
      },
      onComplete: () => {
        setTimeout(() => {
          goto("/result");
        }, 1000);
      },
    });
  }

  let progress = { value: 0 };

  onMount(() => {
    startShuffle();
    fakeLoading();
    gsap.to("#loadingText", {
      opacity: 0.2,
      duration: 1,
      repeat: -1,
      yoyo: true,
    });
  });
</script>

<main
  in:fly={{ duration: 500 }}
  out:fly={{ duration: 500 }}
  class="w-full h-full flex flex-col absolute justify-center items-center"
>
  <img
    id="card1"
    class=" w-[150px] absolute top-[400px] left-[900px]"
    src={cardBack}
    alt="card-back"
  />
  <img
    id="card2"
    class=" w-[150px] absolute top-[380px] left-[875px]"
    src={cardBack}
    alt="card-back"
  />
  <div
    class="relative top-[200px] w-[500px] h-[10px] bg-[#CFCFCF] bg-opacity-10"
  >
    <div
      class="absolute duration-1000 top-0 left-0 h-full bg-white"
      style="width: {progress.value * 100}%"
    />
  </div>

  <div id="loadingText" class=" relative top-[250px] text-[32px] text-white">
    LOADING
  </div>
  <div />
</main>
