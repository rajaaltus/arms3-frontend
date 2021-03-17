<template>
  <v-list flat color="#41704e" style="border-radius:0;">
    <v-list-item-group color="#ffde00">
      <v-list-item
        v-for="(item, i) in approvalActivities"
        :key="i"
        :to="`/admin/approvals/${item.id}`"
      >
        <v-list-item-icon class="pl-2 mr-3">
          <v-icon v-text="item.icon" class="disp-icon"></v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title class="disp"
            >{{ item.title }}
            <v-chip
              x-small
              text-color="black"
              color="yellow"
              v-if="getApprovalCount(item.id) !== 0"
            >
              {{ getApprovalCount(item.id) }}
            </v-chip>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list-item-group>
  </v-list>
</template>
<script>
import { mapGetters, mapState } from "vuex";
export default {
  computed: {
    ...mapGetters(["approvalActivities"]),
    ...mapState([
      'program/programmesCount'
    ])
  },
  async mounted() {},
  methods: {
    getApprovalCount(id) {
      if (id == 1) {
        return this.$store.state.program.programmesCount;
      }
      if (id == 2) {
        return this.$store.state.visitor.visitorsCount;
      }
      if (id == 3) {
        return this.$store.state.training.trainingsCount;
      }
      if (id == 4) {
        return this.$store.state.presentation.presentationsCount;
      }
      if (id == 5) {
        return this.$store.state.participation.participationsCount;
      }
      if (id == 6) {
        return this.$store.state.public.publicEngagementsCount;
      }
      if (id == 7) {
        return this.$store.state.research.researchCount;
      }
      if (id == 8) {
        return this.$store.state.publication.publicationsCount;
      }
      if (id == 9) {
        return this.$store.state.recognition.recognitionsCount;
      }
      if (id == 10) {
        return this.$store.state.patent.patentsCount;
      }
      if (id == 11) {
        return this.$store.state.assignment.assignmentsCount;
      }
      if (id == 12) {
        return this.$store.state.theses.thesesCount;
      }
    },
  }
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
