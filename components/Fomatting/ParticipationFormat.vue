<template>
  <div>
    <p style="text-align: justify; font-family: Calibri">
      {{ index + 1 }}. {{ participation.faculty_name }},
      {{ participation.designation }}. {{ participation.program_name }} from
      {{ $moment(participation.from_date).format("Do MMMM YYYY") }} to
      {{ $moment(participation.to_date).format("Do MMMM YYYY") }}. ({{
        participation.forum
      }})
    </p>
    <p v-if="participation.image">
      <img
        :src="$axios.defaults.baseURL + participation.image.url"
        alt="participation"
        width="600"
        height="350"
      />
    </p>
  </div>
</template>

<script>
export default {
  props: ["index", "participation"],
};
</script>
