<template>
  <div>
    <p style="text-align: justify; font-family: Calibri">
      {{ index + 1 }}. {{ recognition.faculty_name }},
      {{ recognition.organization }}. {{ recognition.award_title }},
      {{ recognition.place }},
      {{ $moment(recognition.date).format("Do MMMM YYYY") }}.
    </p>
    <p v-if="recognition.image">
      <img
        :src="$axios.defaults.baseURL + recognition.image.url"
        alt="recognition"
        width="600"
        height="350"
      />
    </p>
  </div>
</template>

<script>
export default {
  props: ["index", "recognition"],
};
</script>
