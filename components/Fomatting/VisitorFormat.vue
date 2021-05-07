<template>
  <div>
    <p style="text-align: justify; font-family: Calibri; font-style: normal;">
      {{ index + 1 }}. {{ visitor.name }}, {{ visitor.designation }}, {{ visitor.institutional_affiliation }}, visited the Dept. of {{ departmentName }} and delivered a lecture on '{{ visitor.title }}' from
      {{ $moment(visitor.from_date).format("Do MMMM YYYY") }} to {{ $moment(visitor.to_date).format("Do MMMM YYYY") }}.
    </p>
    <p v-if="visitor.image && (visitor.image.ext==='.jpg' || visitor.image.ext==='.png')">
      <img :src="$axios.defaults.baseURL + visitor.image.url" alt="visitor" width="600" height="350" />
    </p>
  </div>
</template>

<script>
export default {
  props: ["index", "visitor", "departmentName"],
  mounted() {
    console.log("from Visitor deptname: " + this.deptartmentName);
  },
};
</script>
