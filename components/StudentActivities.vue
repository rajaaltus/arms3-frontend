<template>
  <v-list flat color="#41704e" style="border-radius: 0;">
    <v-list-item-group v-model="item" color="#ffde00">
      <v-list-item v-for="(item, i) in stdActivities" :key="i" :to="item.path">
        <v-list-item-icon class="pl-2 mr-3">
          <v-icon v-text="item.icon" class="disp-icon"></v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title v-text="item.title" class="disp"></v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list-item-group>
  </v-list>
</template>

<script>
export default {
  computed: {
    stdActivities() {
      return this.$store.state.studentActivities;
    },
  },
};
</script>
<style scoped>
.disp {
  color: #ffffff;
  font-size: 15px;
  font-weight: normal;
}

.disp-icon {
  color: #ffffff;
  font-size: 24px;
  font-weight: normal;
}
</style>
