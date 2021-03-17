<template>
  <div>
    <p style="text-align: justify; font-family: Calibri">
      {{ index + 1 }}. {{ patent.registration_no }}: {{ patent.title }}<br />
      {{ patent.brief_report }}
    </p>
    <p v-if="patent.image">
      <img
        :src="$axios.defaults.baseURL + patent.image.url"
        alt="patent"
        width="600"
        height="350"
      />
    </p>
  </div>
</template>

<script>
export default {
  props: ["index", "patent"],
};
</script>
