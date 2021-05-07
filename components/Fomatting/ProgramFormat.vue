<template>
  <div>
    <p style="text-align: justify; font-family: Calibri; font-style: normal;">
      {{ index + 1 }}. {{ program.coordinators }}.
      {{ program.type.toUpperCase() }}, {{ program.name }},
      {{ program.location }},
      from {{ this.$moment(program.from_date).format("Do MMMM YYYY") }} to
      {{ this.$moment(program.to_date).format("Do MMMM YYYY") }}.
      {{ program.participants_count }} members participated. ({{
        program.forum
      }})
    </p>
    <p v-if="program.image!==null && (program.image.ext==='.jpg' || program.image.ext==='.png') ">
      <img
        :src="$axios.defaults.baseURL + program.image.url"
        alt="program"
        width="600"
        height="350"
      />
    </p>
  </div>
</template>

<script>
export default {
  props: ["index", "program"],
};
</script>
