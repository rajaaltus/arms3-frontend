<template>
  <div>
    <p style="text-align: justify; font-family: Calibri">
      {{ index + 1 }}. {{ training.faculty_name }}. {{ training.program_name }},
      {{ training.institutional_affiliation }} from
      {{ $moment(training.from_date).format("Do MMMM YYYY") }} to
      {{ $moment(training.to_date).format("Do MMMM YYYY") }}.
    </p>
    <p v-if="training.image">
      <img
        :src="$axios.defaults.baseURL + training.image.url"
        alt="training"
        width="600"
        height="350"
      />
    </p>
  </div>
</template>

<script>
export default {
  props: ["index", "training"],
};
</script>
