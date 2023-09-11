<script>
  import { page } from "$app/stores";
  import EarthWeft from "./earthWeft.svelte";
  import EarthWrap from "./earthWrap.svelte";
  import { gsap } from "gsap";
  import { CustomEase } from "gsap/all";

  gsap.registerPlugin(CustomEase);

  CustomEase.create(
    "custom",
    "M0,0 C0.133,-0.351 0.736,1.062 0.868,1.074 0.948,1.081 0.978,1 1,1 "
  );

  let rotationObj = { value: 0 };
  let rotation = 0;
  let currentPathName = "";

  $: {
    // Watch for changes in the $page store
    if (currentPathName != $page.url.pathname) {
      currentPathName = $page.url.pathname;

      // return initatial at home page
      if ($page.url.pathname == "/") {
        rotationObj.value = 0;
        rotation = 0;
      } else {
        // animate transition
        gsap.to(rotationObj, {
          value: "+=80",
          duration: 1.5,
          ease: "custom",
          onUpdate: () => {
            rotation = rotationObj.value;
          },
        });
      }
    }
  }
</script>

<div class="w-full h-full relative transform overflow-clip bg-transparent">
  <EarthWrap dist2Top={508} />
  <EarthWrap dist2Top={963} />
  {#each [0, 15, 30, 45, 60, 75, 90, 105, 120, 135, 150, 165] as turnDegree}
    <EarthWeft turnDegree={turnDegree + rotation} />
  {/each}
</div>
