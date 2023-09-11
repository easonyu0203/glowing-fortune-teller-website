<script>
  import toggleOn from "$lib/images/questions/toggleOn.png";
  import toggleOff from "$lib/images/questions/toggleOff.png";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  export let isOn = false;
  $: bgColor = isOn ? "#F8D773" : "#7B5238";
</script>

<button
  on:click={() => {
    isOn = !isOn;
    dispatch("toggle", { amount: isOn ? 1 : -1, isOn: isOn });
  }}
  class={` flex w-full items-center space-x-6 p-4 border-[#63350A] border-4 rounded-[24px] bg-gradient-to-b ${
    isOn
      ? "from-[#eaa568] from-80% to-[#C8865C]"
      : "from-[#F8D773] from-60% to-[#F6C669]"
  }    `}
  style={`background-color:${bgColor} ;`}
>
  <img src={isOn ? toggleOn : toggleOff} alt="toggleOn" />
  <div class="text-[32px] font-[300] text-[#551A19] overflow-x-scroll">
    <slot />
  </div>
</button>
