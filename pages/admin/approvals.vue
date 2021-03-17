<template>
  <div>
    <v-row>
      <v-col cols="12" lg="3">
        <ApprovalActivities />
      </v-col>
      <v-col cols="12" lg="9">
        <nuxt-child />
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: "Approvals"
    };
  },
  data() {
    return {
      
    };
  },
  async fetch({store}) {
    await store.dispatch('setApprovalActivities')
  }
};
</script>
