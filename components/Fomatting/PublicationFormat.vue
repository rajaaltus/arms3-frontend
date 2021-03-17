<template>
  <div>
    <p style="text-align: justify; font-family: Calibri">
      {{ index + 1 }}. {{ item.reference }}
    </p>
  </div>
</template>

<script>
export default {
  props: ["index", "item"],
};
</script>
