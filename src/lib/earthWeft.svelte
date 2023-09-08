<script>
  export let turnDegree = 0; // positive -> rotate right, negative -> rotate left
  const centerPos = { x: 960, y: -1605 }; // origin: top-left corner
  const width = (Math.abs(centerPos.y) + 1080 + 1000) * 2; // from center and add the height and margin of 1000px
</script>

<div
  class="absolute border-[1px] border-white bg-transparent pointer-events-none"
  style="left: {centerPos.x}px; top: {centerPos.y}px; width: {width}px; height: {1}px;
    transform: translateX(-50%) translateY(-50%) rotate({90 - turnDegree}deg);
    "
/>
