<template>
  <div>
    <v-container fluid>
      <v-row class="pr-4">
        <v-col cols="12" lg="3">
          <v-select
            v-model="selectedYear"
            outlined
            dense
            ref="year"
            :items="reportYears"
            item-value="id"
            item-text="val"
            label="Reporting Year"
            placeholder="Pick Year"
            color="success"
            class="disp"
            @change="fetchData"
          ></v-select>
        </v-col>
      </v-row>
      <v-row no-gutters :key="updateList">
        <v-col
          cols="3"
          lg="2"
          v-for="(department, index) in departments"
          :index="index"
          :key="index"
        >
          <DepartmentCard
            :selectedYear="selectedYear"
            :department="department"
          />
        </v-col>
      </v-row>
       <!-- <TheSnackbar /> -->
    </v-container>
   
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  layout: "super",
  data() {
    return {
      selectedYear: 0,
      cardColor: "white",
      dark: false,
      available: "default",
      updateList: 0
    };
  },
  computed: {
    ...mapState({
      departments: (state) => state.user.departments.result,
    }),
    reportYears() {
      return this.$store.state.reportYears;
    },
  },
  async fetch({ store }) {
    await store.dispatch("user/getAllDepartment");
  },
  mounted() {
    // this.$store.dispatch('snackbar/setSnackbar', {text: "Welcome Admin."})
    this.$router.push('/super/month')
  },
  methods: {
     fetchData() {
      console.log(this.selectedYear)
      this.$store.dispatch("user/getAllDepartment");
      this.updateList++;
    }
  }
};
</script>
