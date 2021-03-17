<template>
  <div>
    <p style="text-align: justify; font-family: Calibri">
      {{ index + 1 }}. {{ publicE.faculty_name }}. {{ publicE.title }},
      {{ publicE.program_name }}, {{ publicE.place }},
      {{ $moment(publicE.date).format("Do MMMM YYYY") }}. Target Group:
      {{ publicE.target_audience }}.
    </p>
    <p v-if="publicE.image">
      <img
        :src="$axios.defaults.baseURL + publicE.image.url"
        alt="publicE"
        width="600"
        height="350"
      />
    </p>
  </div>
</template>

<script>
export default {
  props: ["index", "publicE"],
};
</script>
