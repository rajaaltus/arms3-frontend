<template>
  <div>
    <p style="text-align: justify; font-family: Calibri;">{{ index + 1 }}. {{ research.title }}. {{research.investigator_type==='Principal_Investigator'?'Principal Investigator: '+research.faculty_name + ', Co-Investigators: '+research.investigator_name : 'Principal Investigator: '+research.investigator_name + 'Co-Investigators: '+research.faculty_name}}</p>
    <p style="font-family: Calibri;">({{ research.funding_source }}, {{ research.funding_agency }})</p>
    <p style="text-align: justify; font-family: Calibri;">
      {{ research.research_abstract }}
    </p>
    <p v-if="image!==null && (image.ext==='.jpg' || image.ext==='.png') ">
      <img
        :src="$axios.defaults.baseURL + image.url"
        alt="research"
        width="600"
        height="350"
      />
    </p>
  </div>
</template>

<script>
export default {
  props: ["index", "research"],
  data() {
    return {
      image: null
    }
  },
  mounted() {
    if(this.research.image.length>0)
    this.image = this.research.image[0]
  }
};
</script>
