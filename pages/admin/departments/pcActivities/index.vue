<template>
  <v-app>
    <YearDialog v-if="$store.state.selectedYear==0"/>
    <PageHeader
      :title="$metaInfo.title"
      :reportYears="reportYears"
      :selectedYear="$store.state.selectedYear"
    />
    <v-row>
      <v-col cols="12" md="3" lg="3">
        <v-card class="mx-auto">
          <PatientCare />
        </v-card>
      </v-col>
      <v-col cols="12" md="9" lg="9">
        <h2>Loading...</h2>
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
export default {
  head() {
    return {
      title: 'Patient Care Activities'
    }
  }, 
  data: () => ({
    selectedYear: 0,
  }),
  computed: {
    reportYears() {
      return this.$store.state.reportYears;
    }
  },
  mounted() {
    this.$router.push('/admin/departments/pcActivities/clinical')
  },
  methods: {
    
  }
} 
</script>
