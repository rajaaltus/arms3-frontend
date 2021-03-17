<template>
  <v-alert
    tile
    elevation="0"
    border="left"
    color="blue lighten-1"
    colored-border
    icon="mdi-hospital-building"
  >
    <h2 class="font-weight-bold mb-4">Qualifications</h2>

    <v-card
      flat
      class="mb-3"
      v-for="(item, index) in qualifications"
      :key="index"
    >
      <v-chip label small color="light-blue darken-1 mb-2" dark>
        <span class="font-weight-normal">{{ item.qualification }}</span>
      </v-chip>
      <v-chip label small color="light-blue lighten-4 mb-2">{{
        item.institute
      }}</v-chip>
      <v-chip label small color="light-blue lighten-5 mb-2">
        From {{ $moment(item.duration_from).format("YYYY") }} - to
        {{ $moment(item.duration_to).format("YYYY") }}
      </v-chip>
    </v-card>
  </v-alert>
</template>

<script>
export default {
  props: ['qualifications']
}
</script>
