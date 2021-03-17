<template>
  <div>
    <v-tabs flat background-color="#323232" color="#6ac447" dark>
      <v-tab>
        <span class="mdi mdi-note-outline cust-icon"></span>
        Human Resource Development
      </v-tab>
      <v-tab>
        <span class="mdi mdi-table cust-icon"></span>
        Records
      </v-tab>

      <v-tab-item>
        <v-card tile>
          <v-card-text>
            <YearDialog v-if="$store.state.selectedYear == 0" />
            <PageHeader :title="$metaInfo.title" :reportYears="reportYears" class="ml-0 pb-0 pt-0" />
            <v-row>
              <v-col cols="12" md="3" lg="3">
                <v-card class="mx-auto">
                  <v-list flat color="#41704e" style="border-radius: 0;">
                    <v-list-item-group color="#ffde00">
                      <v-list-item to="/admin/departments/hrd/courses">
                        <v-list-item-icon class="pl-2 mr-3">
                          <v-icon class="disp-icon">mdi-library</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                          <v-list-item-title class="disp">Regular Courses</v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                      <v-list-item to="/admin/departments/hrd/trainings">
                        <v-list-item-icon class="pl-2 mr-3">
                          <v-icon class="disp-icon">mdi-led-on</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                          <v-list-item-title class="disp">Trainings at NIMHANS</v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list-item-group>
                  </v-list>
                </v-card>
              </v-col>
              <v-col cols="12" md="9" lg="9">
                <formsHrdTrainingsForm />
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-tab-item>

      <v-tab-item>
        <v-card flat>
          <v-card-text class="px-0 py-1">
            <v-row>
              <v-col cols="12">
                <tablesHrdTrainingsTable :reportYears="reportYears" />
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: "Faculty/Staff/Students From Other Institutions Trained at NIMHANS",
    };
  },
  data: () => ({
    selectedYear: 0,
  }),
  computed: {
    reportYears() {
      return this.$store.state.reportYears;
    },
  },
  async fetch({ store }) {
    let queryString = "";
    queryString = `department.id=${store.state.auth.user.department}&deleted_ne=true`;
    await store.dispatch("hrdTraining/setHRDTrainings", { qs: queryString });
  },
};
</script>

<style scoped>
.cust-icon {
  font-size: 20px;
  color: #ff7e00;
  padding-right: 10px;
}
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
