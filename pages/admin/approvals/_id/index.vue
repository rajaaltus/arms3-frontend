<template>
  <div>
    <!-- <h1>{{$route.params.id}}</h1> -->
    <div v-if="$route.params.id == 1">
      <h2 class="headline mb-4">Programmes / Events</h2>
      <div v-for="program in programmes" :key="program.id">
        <v-skeleton-loader v-if="loading" height="200" type="article, actions">
        </v-skeleton-loader>
        <Program
          v-else
          :info="program"
          @approved="handleApprove($route.params.id)"
        />
      </div>
    </div>
    <div v-if="$route.params.id == 2">
      <h2 class="headline mb-4">Visitors to the Department</h2>
      <div v-for="visitor in visitors" :key="visitor.id">
        <v-skeleton-loader v-if="loading" height="200" type="article, actions">
        </v-skeleton-loader>
        <Visitor
          v-else
          :info="visitor"
          @approved="handleApprove($route.params.id)"
        />
      </div>
    </div>
    <div v-if="$route.params.id == 3">
      <h2 class="headline mb-4">Trainings</h2>
      <div v-for="training in trainings" :key="training.id">
        <v-skeleton-loader v-if="loading" height="200" type="article, actions">
        </v-skeleton-loader>
        <Training
          v-else
          :info="training"
          @approved="handleApprove($route.params.id)"
        />
      </div>
    </div>
      <div v-if="$route.params.id == 4">
      <h2 class="headline mb-4">Presentations / Posters</h2>
      <div v-for="presentation in presentations" :key="presentation.id">
        <v-skeleton-loader v-if="loading" height="200" type="article, actions">
        </v-skeleton-loader>
        <Presentation
          v-else
          :info="presentation"
          @approved="handleApprove($route.params.id)"
        />
      </div>
    </div>
    <div v-if="$route.params.id == 5">
      <h2 class="headline mb-4">Participations</h2>
      <div v-for="participation in participations" :key="participation.id">
        <v-skeleton-loader v-if="loading" height="200" type="article, actions">
        </v-skeleton-loader>
        <Participation
          v-else
          :info="participation"
          @approved="handleApprove($route.params.id)"
        />
      </div>
    </div>
    <div v-if="$route.params.id == 6">
      <h2 class="headline mb-4">Public Engagements</h2>
      <div v-for="item in publics" :key="item.id">
        <v-skeleton-loader v-if="loading" height="200" type="article, actions">
        </v-skeleton-loader>
        <Public
          v-else
          :info="item"
          @approved="handleApprove($route.params.id)"
        />
      </div>
    </div>
    <div v-if="$route.params.id == 7">
      <h2 class="headline mb-4">Research</h2>
      <div v-for="research in researchData" :key="research.id">
        <v-skeleton-loader v-if="loading" height="200" type="article, actions">
        </v-skeleton-loader>
        <Research
          v-else
          :info="research"
          @approved="handleApprove($route.params.id)"
        />
      </div>
    </div>
    <div v-if="$route.params.id == 8">
      <h2 class="headline mb-4">Publications</h2>
      <div v-for="publication in publications" :key="publication.id">
        <v-skeleton-loader v-if="loading" height="200" type="article, actions">
        </v-skeleton-loader>
        <Publication
          v-else
          :info="publication"
          @approved="handleApprove($route.params.id)"
        />
      </div>
    </div>
    <div v-if="$route.params.id == 9">
      <h2 class="headline mb-4">Recognition</h2>
      <div v-for="recognition in recognitions" :key="recognition.id">
        <v-skeleton-loader v-if="loading" height="200" type="article, actions">
        </v-skeleton-loader>
        <Recognition
          v-else
          :info="recognition"
          @approved="handleApprove($route.params.id)"
        />
      </div>
    </div>
    <div v-if="$route.params.id == 10">
      <h2 class="headline mb-4">Patents</h2>
      <div v-for="patent in patents" :key="patent.id">
        <v-skeleton-loader v-if="loading" height="200" type="article, actions">
        </v-skeleton-loader>
        <Patent
          v-else
          :info="patent"
          @approved="handleApprove($route.params.id)"
        />
      </div>
    </div>
    <div v-if="$route.params.id == 11">
      <h2 class="headline mb-4">Key Assignments</h2>
      <div v-for="assignment in assignments" :key="assignment.id">
        <v-skeleton-loader v-if="loading" height="200" type="article, actions">
        </v-skeleton-loader>
        <Assignment
          v-else
          :info="assignment"
          @approved="handleApprove($route.params.id)"
        />
      </div>
    </div>
    <div v-if="$route.params.id == 12">
      <h2 class="headline mb-4">Theses / Dissertions</h2>
      <div v-for="thesis in theses" :key="thesis.id">
        <v-skeleton-loader v-if="loading" height="200" type="article, actions">
        </v-skeleton-loader>
        <Theses
          v-else
          :info="thesis"
          @approved="handleApprove($route.params.id)"
        />
      </div>
    </div>
    
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      loading: false
    };
  },
  computed: {
    ...mapState({
      programmes: state => state.program.programmesData.result,
      visitors: state => state.visitor.visitorsData.result,
      trainings: state => state.training.trainingsData.result,
      presentations: state => state.presentation.presentationsData.result,
      participations: state => state.participation.participationsData.result,
      publics: state => state.public.publicData.result,
      researchData: state => state.research.researchData.result,
      publications: state => state.publication.publicationsData.result,
      recognitions: state => state.recognition.recognitionsData.result,
      patents: state => state.patent.patentsData.result,
      assignments: state => state.assignment.assignmentsData.result,
      theses: state => state.theses.thesesData.result
    })
  },
  async fetch({ store }) {
    let queryString = "";
    if (store.state.auth.user.userType === "DEPARTMENT")
      queryString = `department.id=${store.state.auth.user.department}&approval_status=Pending&deleted_ne=true&_sort=created_at:DESC`;
    else
      queryString = `department.id=${store.state.auth.user.department}&user.id=${store.state.auth.user.id}&deleted_ne=true&_sort=created_at:DESC`;
    await store.dispatch("program/setProgrammesData", { qs: queryString });
    await store.dispatch("visitor/setVisitorsData", { qs: queryString });
    await store.dispatch("training/setTrainingsData", { qs: queryString });
    await store.dispatch("presentation/setPresentationsData", { qs: queryString });
    await store.dispatch("participation/setParticipationsData", { qs: queryString });
    await store.dispatch("public/setPublicData", { qs: queryString });
    await store.dispatch("publication/setPublicationsData", { qs: queryString });
    await store.dispatch("research/setResearchData", { qs: queryString });
    await store.dispatch("recognition/setRecognitionsData", { qs: queryString });
    await store.dispatch("patent/setPatentsData", { qs: queryString });
    await store.dispatch("assignment/setAssignmentsData", { qs: queryString });
    await store.dispatch("theses/setThesesData", { qs: queryString });
  },
  mounted() {
    this.getApprovalsData(this.$route.params.id);
  },
  methods: {
    handleApprove(id) {
      console.log("Recieved...");
      this.getApprovalsData(id);
    },
    getApprovalsData(id) {
      if (id == 1) {
        this.loading = true;
        let queryString = "";
        if (this.$store.state.auth.user.userType === "DEPARTMENT")
          queryString = `department.id=${this.$store.state.auth.user.department}&approval_status=Pending&deleted_ne=true&_sort=created_at:DESC`;
        else
          queryString = `department.id=${this.$store.state.auth.user.department}&deleted_ne=true&user.id=${this.$auth.user.id}&_sort=created_at:DESC`;
        this.$store
          .dispatch("program/setProgrammesData", { qs: queryString })
          .then(resp => {})
          .catch(err => {})
          .finally(() => {
            this.loading = false;
          });
      }
      if (id == 2) {
        this.loading = true;
        let queryString = "";
        if (this.$store.state.auth.user.userType === "DEPARTMENT")
          queryString = `department.id=${this.$store.state.auth.user.department}&approval_status=Pending&deleted_ne=true&_sort=created_at:DESC`;
        else
          queryString = `department.id=${this.$store.state.auth.user.department}&deleted_ne=true&user.id=${this.$auth.user.id}&_sort=created_at:DESC`;
        this.$store
          .dispatch("visitor/setVisitorsData", { qs: queryString })
          .then(resp => {})
          .catch(err => {})
          .finally(() => {
            this.loading = false;
          });
      }
      if (id == 3) {
        this.loading = true;
        let queryString = "";
        if (this.$store.state.auth.user.userType === "DEPARTMENT")
          queryString = `department.id=${this.$store.state.auth.user.department}&approval_status=Pending&deleted_ne=true&_sort=created_at:DESC`;
        else
          queryString = `department.id=${this.$store.state.auth.user.department}&deleted_ne=true&user.id=${this.$auth.user.id}&_sort=created_at:DESC`;
        this.$store
          .dispatch("training/setTrainingsData", { qs: queryString })
          .then(resp => {})
          .catch(err => {})
          .finally(() => {
            this.loading = false;
          });
      }
      if (id == 4) {
        this.loading = true;
        let queryString = "";
        if (this.$store.state.auth.user.userType === "DEPARTMENT")
          queryString = `department.id=${this.$store.state.auth.user.department}&approval_status=Pending&deleted_ne=true&_sort=created_at:DESC`;
        else
          queryString = `department.id=${this.$store.state.auth.user.department}&deleted_ne=true&user.id=${this.$auth.user.id}&_sort=created_at:DESC`;
        this.$store
          .dispatch("presentation/setPresentationsData", { qs: queryString })
          .then(resp => {})
          .catch(err => {})
          .finally(() => {
            this.loading = false;
          });
      }
      if (id == 5) {
        this.loading = true;
        let queryString = "";
        if (this.$store.state.auth.user.userType === "DEPARTMENT")
          queryString = `department.id=${this.$store.state.auth.user.department}&approval_status=Pending&deleted_ne=true&_sort=created_at:DESC`;
        else
          queryString = `department.id=${this.$store.state.auth.user.department}&deleted_ne=true&user.id=${this.$auth.user.id}&_sort=created_at:DESC`;
        this.$store
          .dispatch("participation/setParticipationsData", { qs: queryString })
          .then(resp => {})
          .catch(err => {})
          .finally(() => {
            this.loading = false;
          });
      }
      if (id == 6) {
        this.loading = true;
        let queryString = "";
        if (this.$store.state.auth.user.userType === "DEPARTMENT")
          queryString = `department.id=${this.$store.state.auth.user.department}&approval_status=Pending&deleted_ne=true&_sort=created_at:DESC`;
        else
          queryString = `department.id=${this.$store.state.auth.user.department}&deleted_ne=true&user.id=${this.$auth.user.id}&_sort=created_at:DESC`;
        this.$store
          .dispatch("public/setPublicData", { qs: queryString })
          .then(resp => {})
          .catch(err => {})
          .finally(() => {
            this.loading = false;
          });
      }
      if (id == 7) {
        this.loading = true;
        let queryString = "";
        if (this.$store.state.auth.user.userType === "DEPARTMENT")
          queryString = `department.id=${this.$store.state.auth.user.department}&approval_status=Pending&deleted_ne=true&_sort=created_at:DESC`;
        else
          queryString = `department.id=${this.$store.state.auth.user.department}&deleted_ne=true&user.id=${this.$auth.user.id}&_sort=created_at:DESC`;
        this.$store
          .dispatch("research/setResearchData", { qs: queryString })
          .then(resp => {})
          .catch(err => {})
          .finally(() => {
            this.loading = false;
          });
      }
      if (id == 8) {
        this.loading = true;
        let queryString = "";
        if (this.$store.state.auth.user.userType === "DEPARTMENT")
          queryString = `department.id=${this.$store.state.auth.user.department}&approval_status=Pending&deleted_ne=true&_sort=created_at:DESC`;
        else
          queryString = `department.id=${this.$store.state.auth.user.department}&deleted_ne=true&user.id=${this.$auth.user.id}&_sort=created_at:DESC`;
        this.$store
          .dispatch("publication/setPublicationsData", { qs: queryString })
          .then(resp => {})
          .catch(err => {})
          .finally(() => {
            this.loading = false;
          });
      }
      if (id == 9) {
        this.loading = true;
        let queryString = "";
        if (this.$store.state.auth.user.userType === "DEPARTMENT")
          queryString = `department.id=${this.$store.state.auth.user.department}&approval_status=Pending&deleted_ne=true&_sort=created_at:DESC`;
        else
          queryString = `department.id=${this.$store.state.auth.user.department}&deleted_ne=true&user.id=${this.$auth.user.id}&_sort=created_at:DESC`;
        this.$store
          .dispatch("recognition/setRecognitionsData", { qs: queryString })
          .then(resp => {})
          .catch(err => {})
          .finally(() => {
            this.loading = false;
          });
      }
      if (id == 10) {
        this.loading = true;
        let queryString = "";
        if (this.$store.state.auth.user.userType === "DEPARTMENT")
          queryString = `department.id=${this.$store.state.auth.user.department}&approval_status=Pending&deleted_ne=true&_sort=created_at:DESC`;
        else
          queryString = `department.id=${this.$store.state.auth.user.department}&deleted_ne=true&user.id=${this.$auth.user.id}&_sort=created_at:DESC`;
        this.$store
          .dispatch("patent/setPatentsData", { qs: queryString })
          .then(resp => {})
          .catch(err => {})
          .finally(() => {
            this.loading = false;
          });
      }
      if (id == 11) {
        this.loading = true;
        let queryString = "";
        if (this.$store.state.auth.user.userType === "DEPARTMENT")
          queryString = `department.id=${this.$store.state.auth.user.department}&approval_status=Pending&deleted_ne=true&_sort=created_at:DESC`;
        else
          queryString = `department.id=${this.$store.state.auth.user.department}&deleted_ne=true&user.id=${this.$auth.user.id}&_sort=created_at:DESC`;
        this.$store
          .dispatch("assignment/setAssignmentsData", { qs: queryString })
          .then(resp => {})
          .catch(err => {})
          .finally(() => {
            this.loading = false;
          });
      }
      if (id == 12) {
        this.loading = true;
        let queryString = "";
        if (this.$store.state.auth.user.userType === "DEPARTMENT")
          queryString = `department.id=${this.$store.state.auth.user.department}&approval_status=Pending&deleted_ne=true&_sort=created_at:DESC`;
        else
          queryString = `department.id=${this.$store.state.auth.user.department}&deleted_ne=true&user.id=${this.$auth.user.id}&_sort=created_at:DESC`;
        this.$store
          .dispatch("theses/setThesesData", { qs: queryString })
          .then(resp => {})
          .catch(err => {})
          .finally(() => {
            this.loading = false;
          });
      }
    }
  }
};
</script>
