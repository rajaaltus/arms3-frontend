<template>
  <v-alert
    tile
    elevation="1"
    border="left"
    color="red lighten-1"
    colored-border
    icon="mdi-briefcase"
  >
    <h2 class="font-weight-bold">Experience</h2>

    <v-timeline dense>
      <v-timeline-item
        small
        color="red"
        v-for="(item, index) in experiences"
        :key="index"
      >
        <div class="py-4">
          <v-chip label small color="red lighten-2 mb-2">
            <span class="body-1 font-weight-bold"
              >{{ $moment(item.duration_from).format("YYYY") }} -
              {{ $moment(item.duration_to).format("YYYY") }}</span
            >
          </v-chip>
          <h2>{{ item.designation }}</h2>
          <div>{{ item.organization }}, {{ item.place }}.</div>
        </div>
      </v-timeline-item>
    </v-timeline>
  </v-alert>
</template>

<script>
export default {
  props: ['experiences']
}
</script>
