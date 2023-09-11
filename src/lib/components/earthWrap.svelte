<script>
  export let dist2Top;
  const centerPos = { x: 960, y: -1605 }; // origin: top-left corner
  const diameter = (Math.abs(centerPos.y) + dist2Top) * 2;
</script>

<div
  class="absolute border-[1px] border-white rounded-full bg-transparent transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
  style="left: {centerPos.x}px; top: {centerPos.y}px; width: {diameter}px; height: {diameter}px"
/>
