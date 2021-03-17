const srcs = {
  1: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
  2: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
  3: "https://cdn.vuetifyjs.com/images/lists/3.jpg",
  4: "https://cdn.vuetifyjs.com/images/lists/4.jpg",
  5: "https://cdn.vuetifyjs.com/images/lists/5.jpg",
};
export const state = () => ({
  selectedYear: 0,
  departmentName: "",
  reportStepper: 0,
  userData: {},
  reportYears: [
    {
      id: 2018,
      val: "2018-2019",
    },
    {
      id: 2019,
      val: "2019-2020",
    },
    {
      id: 2020,
      val: "2020-2021",
    },
    {
      id: 2021,
      val: "2021-2022",
    },
  ],
  activities: [],
  studentActivities: [],
  approvalActivities: [
    {
      id: 1,
      title: "Programmes / Events",
      count: 12,
      icon: "mdi-clipboard-list",
      path: "/admin/activities/faculties/program",
      dataName: "programmesData",
    },
    {
      id: 2,
      title: "Department Visitors",
      count: 5,
      icon: "mdi-certificate-outline",
      path: "/admin/activities/faculties/visitor",
      dataName: "visitorsData",
    },
    {
      id: 3,
      title: "Training Underwent",
      count: 8,
      icon: "mdi-bike-fast",
      path: "/admin/activities/faculties/training",
      dataName: "",
    },
    {
      id: 4,
      title: "Presentations / Posters",
      count: 14,
      icon: "mdi-billboard",
      path: "/admin/activities/faculties/presentation",
      dataName: "",
    },
    {
      id: 5,
      title: "Participations",
      count: 4,
      icon: "mdi-atom",
      path: "/admin/activities/faculties/participation",
      dataName: "",
    },
    {
      id: 6,
      title: "Public Engagement",
      count: 2,
      icon: "mdi-air-horn",
      path: "/admin/activities/faculties/public",
      dataName: "",
    },
    {
      id: 7,
      title: "Research Activities",
      count: 7,
      icon: "mdi-book-search",
      path: "/admin/activities/faculties/research",
      dataName: "",
    },
    {
      id: 8,
      title: "Publications",
      count: 6,
      icon: "mdi-bookshelf",
      path: "/admin/activities/faculties/publication",
      dataName: "",
    },
    {
      id: 9,
      title: "Recognitions",
      count: 18,
      icon: "mdi-crown",
      path: "/admin/activities/faculties/recognition",
      dataName: "",
    },
    {
      id: 10,
      title: "Patents",
      count: 7,
      icon: "mdi-book-lock",
      path: "/admin/activities/faculties/patent",
      dataName: "",
    },
    {
      id: 11,
      title: "Key Assignments",
      count: 20,
      icon: "mdi-ship-wheel",
      path: "/admin/activities/faculties/assignment",
      dataName: "",
    },
    {
      id: 12,
      title: "Theses / Dissertions",
      count: 20,
      icon: "mdi-album",
      path: "/admin/activities/students/theses",
      dataName: "",
    },
  ],
  students: [],
  staffs: [],

  people: [
    { header: "Faculty" },
    { name: "Sandra Adams", group: "Faculty", avatar: srcs[1] },
    { name: "Ali Connors", group: "Faculty", avatar: srcs[2] },
    { name: "Trevor Hansen", group: "Faculty", avatar: srcs[3] },
    { name: "Tucker Smith", group: "Faculty", avatar: srcs[2] },
    { divider: true },
    { header: "Student" },
    { name: "Britta Holt", group: "Student", avatar: srcs[4] },
    { name: "Jane Smith ", group: "Student", avatar: srcs[5] },
    { name: "John Smith", group: "Student", avatar: srcs[1] },
    { name: "Sandra Williams", group: "Student", avatar: srcs[3] },
  ],
  fullUser: {},
});
export const getters = {
  activities(state) {
    return state.activities;
  },
  approvalActivities(state) {
    return state.approvalActivities;
  },
};
export const mutations = {
  SET_DEPARTMENT_NAME(state, name) {
    state.departmentName = name;
  },
  SET_USER_DATA(state, userData) {
    state.userData = userData;
  },
  UPDATE_STEPPER(state, reportStepper) {
    state.reportStepper = reportStepper;
  },
  SET_STUDENTS(state, students) {
    state.students = students;
  },
  SET_STAFFS(state, staffs) {
    state.staffs = staffs;
  },
  SET_REPORTING_YEAR(state, selectedYear) {
    state.selectedYear = selectedYear;
  },
  SET_APPROVAL_ACTIVITIES(state, approvalActivities) {
    state.approvalActivities = [
      {
        id: 1,
        title: "Programmes / Events",
        count: 12,
        icon: "mdi-clipboard-list",
        path: "/admin/activities/faculties/program",
      },
      {
        id: 2,
        title: "Department Visitors",
        count: 5,
        icon: "mdi-certificate-outline",
        path: "/admin/activities/faculties/visitor",
      },
      {
        id: 3,
        title: "Training Underwent",
        count: 8,
        icon: "mdi-bike-fast",
        path: "/admin/activities/faculties/training",
        storeVar: "vistor.visitorsData",
      },
      {
        id: 4,
        title: "Presentations / Posters",
        count: 14,
        icon: "mdi-billboard",
        path: "/admin/activities/faculties/presentation",
      },
      {
        id: 5,
        title: "Participations",
        count: 4,
        icon: "mdi-atom",
        path: "/admin/activities/faculties/participation",
      },
      {
        id: 6,
        title: "Public Engagement",
        count: 2,
        icon: "mdi-air-horn",
        path: "/admin/activities/faculties/public",
      },
      {
        id: 7,
        title: "Research Activities",
        count: 7,
        icon: "mdi-book-search",
        path: "/admin/activities/faculties/research",
      },
      {
        id: 8,
        title: "Publications",
        count: 6,
        icon: "mdi-bookshelf",
        path: "/admin/activities/faculties/publication",
      },
      {
        id: 9,
        title: "Recognitions",
        count: 18,
        icon: "mdi-crown",
        path: "/admin/activities/faculties/recognition",
      },
      {
        id: 10,
        title: "Patents",
        count: 7,
        icon: "mdi-book-lock",
        path: "/admin/activities/faculties/patent",
      },
      {
        id: 11,
        title: "Key Assignments",
        count: 20,
        icon: "mdi-ship-wheel",
        path: "/admin/activities/faculties/assignment",
      },
      {
        id: 12,
        title: "Theses / Dissertions",
        count: 20,
        icon: "mdi-album",
        path: "/admin/activities/students/theses",
      },
    ];
  },
  SETACTIVITIES(state, activities) {
    state.activities = [
      {
        id: 1,
        title: "Programmes / Events",
        count: 12,
        icon: "mdi-clipboard-list",
        path: "/admin/activities/faculties/program",
      },
      {
        id: 2,
        title: "Department Visitors",
        count: 5,
        icon: "mdi-certificate-outline",
        path: "/admin/activities/faculties/visitor",
      },
      {
        id: 3,
        title: "Training Underwent",
        count: 8,
        icon: "mdi-bike-fast",
        path: "/admin/activities/faculties/training",
        storeVar: "vistor.visitorsData",
      },
      {
        id: 4,
        title: "Presentations / Posters",
        count: 14,
        icon: "mdi-billboard",
        path: "/admin/activities/faculties/presentation",
      },
      {
        id: 5,
        title: "Participations",
        count: 4,
        icon: "mdi-atom",
        path: "/admin/activities/faculties/participation",
      },
      {
        id: 6,
        title: "Public Engagement",
        count: 2,
        icon: "mdi-air-horn",
        path: "/admin/activities/faculties/public",
      },
      {
        id: 7,
        title: "Research Activities",
        count: 7,
        icon: "mdi-book-search",
        path: "/admin/activities/faculties/research",
      },
      {
        id: 8,
        title: "Publications",
        count: 6,
        icon: "mdi-bookshelf",
        path: "/admin/activities/faculties/publication",
      },
      {
        id: 9,
        title: "Recognitions",
        count: 18,
        icon: "mdi-crown",
        path: "/admin/activities/faculties/recognition",
      },
      {
        id: 10,
        title: "Patents",
        count: 7,
        icon: "mdi-book-lock",
        path: "/admin/activities/faculties/patent",
      },
      {
        id: 11,
        title: "Key Assignments",
        count: 20,
        icon: "mdi-ship-wheel",
        path: "/admin/activities/faculties/assignment",
      },
    ];
  },
  SET_STUDENT_ACTIVITIES(state, studentActivities) {
    state.studentActivities = [
      {
        id: 4,
        title: "Presentations / Posters",
        count: 14,
        icon: "mdi-billboard",
        path: "/admin/activities/students/presentation",
      },
      {
        id: 5,
        title: "Participations",
        count: 4,
        icon: "mdi-atom",
        path: "/admin/activities/students/participation",
      },
      {
        id: 8,
        title: "Publications",
        count: 6,
        icon: "mdi-bookshelf",
        path: "/admin/activities/students/publication",
      },
      {
        id: 9,
        title: "Recognitions",
        count: 18,
        icon: "mdi-crown",
        path: "/admin/activities/students/recognition",
      },
      {
        id: 12,
        title: "Theses / Dissertions",
        count: 20,
        icon: "mdi-clock",
        path: "/admin/activities/students/theses",
      },
    ];
  },
  SET_FULL_USER(state, fullUser) {
    state.fullUser = fullUser;
  },
};

export const actions = {
  async setDepartmentName({ commit }, id) {
    await this.$axios
      .$get(`/departments/${id}`)
      .then((resp) => {
        commit("SET_DEPARTMENT_NAME", resp.name);
      })
      .catch((e) => {
        console.log(e);
      });
  },
  async setUserData({ commit }, data) {
    commit("SET_USER_DATA", data);
  },
  async nuxtClientInit({ commit }) {
    await this.$axios
      .$get(`/users/${this.$auth.user.id}`)
      .then((response) => {
        commit("SET_FULL_USER", response);
        console.log("I am from ServerInit");
      })
      .catch((e) => {})
      .finally(function () {});
  },
  async updateStepper({ commit }, reportStepper) {
    commit("UPDATE_STEPPER", reportStepper);
  },
  async setReportingYear({ commit }, selectedYear) {
    commit("SET_REPORTING_YEAR", selectedYear);
  },
  async setActivities({ commit }, activities) {
    commit("SETACTIVITIES", activities);
  },
  async setStudentActivities({ commit }, studentActivities) {
    commit("SET_STUDENT_ACTIVITIES", studentActivities);
  },
  async setApprovalActivities({ commit }, approvalActivities) {
    commit("SET_APPROVAL_ACTIVITIES", approvalActivities);
  },
  async setStudents({ commit }, { qs }) {
    await this.$axios
      .$get(`/users?${qs}`)
      .then((response) => {
        commit("SET_STUDENTS", response);
      })
      .catch((e) => {})
      .finally(function () {});
  },
  async setStaffs({ commit }, { qs }) {
    await this.$axios
      .$get(`/users?${qs}`)
      .then((response) => {
        commit("SET_STAFFS", response);
      })
      .catch((e) => {})
      .finally(function () {});
  },
  async deleteFile({ commit }, { id }) {
    await this.$axios
      .$delete(`/upload/files/${id}`)
      .then((response) => {
        return true;
      })
      .catch((e) => {})
      .finally(function () {});
  },
};
