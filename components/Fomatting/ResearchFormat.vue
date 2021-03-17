<template>
  <div>
    <p style="text-align: justify; font-family: Calibri;">{{ index + 1 }}. {{ research.title }}. Co-Investigators: {{ research.investigator_name }}.</p>
    <p style="font-family: Calibri;">({{ research.funding_source }}, {{ research.funding_agency }})</p>
    <p style="text-align: justify; font-family: Calibri;">
      {{ research.research_abstract }}
    </p>
    <p v-if="research.image && research.image.url">
      <img :src="$axios.defaults.baseURL + research.image.url" alt="research" width="600" height="350" />
    </p>
  </div>
</template>

<script>
export default {
  props: ["index", "research"],
};
</script>
