<template>
  <div>
    <p style="text-align: justify; font-family: Calibri">
      {{ index + 1 }}. {{ presentation.faculty_name }},
      {{ presentation.coauthors }}. {{ presentation.title }}. ({{
        presentation.forum
      }})
    </p>
    <p v-if="presentation.image">
      <img
        :src="$axios.defaults.baseURL + presentation.image.url"
        alt="presentation"
        width="600"
        height="350"
      />
    </p>
  </div>
</template>

<script>
export default {
  props: ["index", "presentation"],
};
</script>