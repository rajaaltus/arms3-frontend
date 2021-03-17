<template>
  <div>
    <p style="font-family: Calibri">
      {{ index + 1 }}. {{ assignment.faculty_name }},
      {{ assignment.designation }}. {{ assignment.roles }}
    </p>
    <p style="text-align: justify; font-family: Calibri; font-style: normal">
      {{ assignment.brief_report }}
    </p>
    <p v-if="assignment.image">
      <img
        :src="$axios.defaults.baseURL + assignment.image.url"
        alt="assignment"
        width="600"
        height="350"
      />
    </p>
  </div>
</template>

<script>
export default {
  props: ["index", "assignment"],
};
</script>
