<template>
  <div>
    <!-- <pre>{{theses}}</pre> -->
    <p style="text-align: justify; font-family: Calibri; font-style: normal;">
      {{ index + 1 }}. {{ theses.student_name}}, {{ theses.thesis_title }}. Guide: {{ theses.guide}}, Co-guides: {{ theses.coguides}}. Funding: {{ theses.funding}}. ({{ theses.status}})
    </p>
    <p style="text-align: justify; font-family: Calibri; font-style: normal;">
     {{ theses.brief_report}}
    </p>
    <p v-if="theses.image!==null && (theses.image.ext==='.jpg' || theses.image.ext==='.png') ">
      <img
        :src="$axios.defaults.baseURL + theses.image.url"
        alt="theses"
        width="600"
        height="350"
      />
    </p>
  </div>
</template>

<script>
export default {
  props: ["index", "theses"],
};
</script>
