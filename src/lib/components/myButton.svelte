<script>
  /**
   * Function to handle the button click event.
   *
   * @param {MouseEvent} e - The click event object.
   */
  export let onclick = function (e) {
    console.log(e);
  };
</script>

<button
  on:click={onclick}
  class=" my-bnt mt-[80px] w-[368px] font-bold h-[107px] bg-[#FFD78A] rounded-[32px] shadow-[0_12px_15px_0_rgba(9,33,40,0.8)] border-[#6F3D0F] border-[5px] text-[#6B350D] text-4xl"
>
  <slot />
</button>

<style>
  .my-bnt {
    background: linear-gradient(
      180deg,
      rgba(255, 215, 138, 1) 52%,
      rgba(201, 138, 44, 1) 100%
    );
  }
</style>
