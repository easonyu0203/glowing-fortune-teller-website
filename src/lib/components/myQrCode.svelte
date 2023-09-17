<script>
  import r1 from "$lib/images/qrcode/Result1-研究.png";
  import r2 from "$lib/images/qrcode/Result2-內省.png";
  import r3 from "$lib/images/qrcode/result3-創作.png";
  import r4 from "$lib/images/qrcode/result4-社會.png";
  import r5 from "$lib/images/qrcode/result5-感官.png";
  import r6 from "$lib/images/qrcode/result6-操作.png";
  import r7 from "$lib/images/qrcode/result7-事務.png";
  import r8 from "$lib/images/qrcode/result8-商業.png";
  import r9 from "$lib/images/qrcode/result9-主導.png";
  import r10 from "$lib/images/qrcode/result10-業務.png";
  import r11 from "$lib/images/qrcode/result11-服務.png";
  import r12 from "$lib/images/qrcode/result12-自然.png";

  export let width = 300;
  export let index = 0;

  const data = [r1, r2, r3, r4, r5, r6, r7, r8, r9, r10, r11, r12];
</script>

<img
  src={data[index - 1]}
  alt="qr-code"
  class={`w-[${width}px] h-[${width}px]`}
/>
