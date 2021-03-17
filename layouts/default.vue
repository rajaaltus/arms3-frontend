<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" src="/dashboard_back_1.jpg" :mini-variant.sync="mini" floating permanent app dark>
      <div class="py-3" style="max-height: 400px;">
        <v-list-item v-if="!mini">
          <v-img src="/logo.png" max-width="30%"></v-img>
        </v-list-item>
        <v-list-item v-else style="max-height: 200px;">
          <v-img src="/logo.png" max-width="100%"></v-img>
        </v-list-item>
      </div>
      <v-divider></v-divider>
      <v-list-item class="px-2">
        <v-list-item-avatar>
          <!-- <v-img :src="user.image?`${$axios.defaults.baseURL}${user.image.url}`:'/avatar-default-icon.png'"></v-img> -->
          <v-img :src="avatar_url"></v-img>
        </v-list-item-avatar>

        <v-list-item-title class="pl-2"
          >{{ this.$store.state.auth.user.fullname }} <br />
          <span class="caption font-weight-light">
            {{ user ? user.designation : "" }}
          </span></v-list-item-title
        >

        <!-- <v-btn icon small color="green" @click.stop="mini = !mini"> </v-btn> -->
      </v-list-item>

      <v-divider></v-divider>

      <v-list-item dense link to="/user_profile">
        <v-list-item-icon>
          <v-icon color="green darken-1">mdi-account</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title class="menu-title">My Profile</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item dense link to="/settings" v-if="$auth.user.userType === 'DEPARTMENT'">
        <v-list-item-icon>
          <v-icon color="orange">mdi-cogs</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title class="menu-title">Settings</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item nav dense link @click="logout">
        <v-list-item-icon>
          <v-icon color="red darken-2">mdi-logout</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title class="menu-title">Logout</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list nav>
        <div v-if="$auth.user.userType === 'DEPARTMENT'">
          <template v-for="item in items">
            <v-list-group v-if="item.children" :key="item.title" :to="item.to" v-model="item.model" :prepend-icon="item.icon" append-icon="" color="green">
              <template v-slot:activator>
                <v-list-item-content>
                  <v-list-item-title class="menu-title">
                    {{ item.title }}
                  </v-list-item-title>
                </v-list-item-content>
              </template>
              <v-list-item v-for="(child, i) in item.children" :key="i" :to="child.to" link router dense exact class="px-2">
                <v-list-item-action v-if="child.icon">
                  <v-icon>{{ child.icon }}</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title class="menu-title">
                    {{ child.title }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-group>
            <v-list-item v-else :key="item.title" :to="item.to" link router exact dense>
              <v-list-item-action>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title class="menu-title">
                  {{ item.title }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>
        </div>
        <!-- Faculty forms -->
        <div v-if="$auth.user.userType === 'FACULTY'">
          <template v-for="item in itemsFaculty">
            <v-list-group v-if="item.children" :key="item.title" :to="item.to" v-model="item.model" :prepend-icon="item.icon" append-icon="" color="green">
              <template v-slot:activator>
                <v-list-item-content>
                  <v-list-item-title class="menu-title">
                    {{ item.title }}
                  </v-list-item-title>
                </v-list-item-content>
              </template>
              <v-list-item v-for="(child, i) in item.children" :key="i" :to="child.to" link router dense exact class="px-2">
                <v-list-item-action v-if="child.icon">
                  <v-icon>{{ child.icon }}</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title class="menu-title">
                    {{ child.title }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-group>
            <v-list-item v-else :key="item.title" :to="item.to" link router exact dense>
              <v-list-item-action>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title class="menu-title">
                  {{ item.title }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>
        </div>
        <!-- Student forms -->
        <div v-if="$auth.user.userType === 'STUDENT'">
          <template v-for="item in itemsStudent">
            <v-list-group v-if="item.children" :key="item.title" :to="item.to" v-model="item.model" :prepend-icon="item.icon" append-icon="" color="green">
              <template v-slot:activator>
                <v-list-item-content>
                  <v-list-item-title class="menu-title">
                    {{ item.title }}
                  </v-list-item-title>
                </v-list-item-content>
              </template>
              <v-list-item v-for="(child, i) in item.children" :key="i" :to="child.to" link router dense exact class="px-2">
                <v-list-item-action v-if="child.icon">
                  <v-icon>{{ child.icon }}</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title class="menu-title">
                    {{ child.title }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-group>
            <v-list-item v-else :key="item.title" :to="item.to" link router exact dense>
              <v-list-item-action>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title class="menu-title">
                  {{ item.title }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>
        </div>
      </v-list>

      <template v-slot:append>
        <v-list-item nav dense>
          <v-list-item-icon>
            <v-icon color="white">mdi-apple-icloud</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="menu-title">2.1.1</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-navigation-drawer>
    <v-app-bar flat dense app>
      <v-app-bar-nav-icon @click.stop="mini = !mini" />
      <!-- <v-app-bar-nav-icon
        @click.stop="$vuetify.theme.dark = !$vuetify.theme.dark"
        >
        <v-tooltip right>
      <template v-slot:activator="{ on }" class="ml-4">
        <v-icon v-on="on">mdi-owl</v-icon>
      </template>
      <span>Switch to Dark/Light mode</span>
    </v-tooltip>
    </v-app-bar-nav-icon> -->
      <v-spacer></v-spacer>
      <h2>Reporting Year</h2>
      <v-card elevation="0" class="amber ml-3 mr-2 px-2 display-1 font-weight-bold"> {{ $store.state.selectedYear }} - {{ $store.state.selectedYear + 1 }} </v-card>
    </v-app-bar>
    <v-main>
      <v-container fluid>
        <v-snackbar></v-snackbar>
        <nuxt />
      </v-container>
    </v-main>
    <v-snackbar
      v-for="(snackbar, index) in snackbars.filter((s) => s.showing)"
      top
      right
      :key="snackbar.text + Math.random()"
      :value="snackbar.showing"
      @input="removeSnackbar(snackbar)"
      @errors="handleErrors"
      :timeout="snackbar.timeout"
      :color="snackbar.color"
      :style="`top: ${index * 60 + 8}px`"
    >
      {{ snackbar.text }}

      <v-btn text @click="removeSnackbar(snackbar)">
        Close
      </v-btn>
    </v-snackbar>
  </v-app>
</template>

<script>
// import PageHeader from "@/components/PageHeader";
import { mapState } from "vuex";
export default {
  head() {
    return {
      title: "ARMS Admin - " + this.$route.name,
    };
  },
  // components: {
  //   PageHeader,
  // },
  data() {
    return {
      drawer: true,
      items: [
        { title: "Home", icon: "mdi-home", to: "/admin" },
        {
          title: "Department",
          icon: "mdi-hospital-building",
          children: [
            {
              title: "About",
              icon: "mdi-chevron-double-right",
              to: "/admin/departments",
            },
            {
              title: "Patient Care Activities",
              icon: "mdi-chevron-double-right",
              to: "/admin/departments/pcActivities",
            },
            {
              title: "HRD",
              icon: "mdi-chevron-double-right",
              to: "/admin/departments/hrd",
            },
            {
              title: "Departmental Staff",
              icon: "mdi-chevron-double-right",
              to: "/admin/departments/faculty",
            },
          ],
        },
        {
          title: "Activities & Resources",
          icon: "mdi-library",
          children: [
            {
              title: "Faculty / Staff",
              icon: "mdi-chevron-double-right",
              to: "/admin/activities/faculties",
            },
            {
              title: "Students",
              icon: "mdi-chevron-double-right",
              to: "/admin/activities/students",
            },
          ],
        },
        // { title: "Approval Status", icon: "mdi-cards", to: "/admin/approvals" },
        // { title: "Reports", icon: "mdi-chart-bar", to: "/admin/reports" },
        // { title: "Test Report", icon: "mdi-cogs", to:"/admin/medium" }
      ],
      itemsFaculty: [
        { title: "Home", icon: "mdi-home", to: "/admin" },
        {
          title: "Activities & Resources",
          icon: "mdi-library",
          to: "/admin/activities/faculties",
        },
        // { title: "Approval Status", icon: "mdi-cards", to: "/admin/approvals" }
        // { title: "Reports", icon: "mdi-chart-bar", to: "/admin/reports" }
      ],
      itemsStudent: [
        { title: "Home", icon: "mdi-home", to: "/admin" },
        {
          title: "Activities & Resources",
          icon: "mdi-library",
          to: "/admin/activities/students",
        },
        // { title: "Approval Status", icon: "mdi-cards", to: "/admin/approvals" }
        // { title: "Reports", icon: "mdi-chart-bar", to: "/admin/reports" }
      ],
      mini: true,
    };
  },
  computed: {
    ...mapState({
      user: (state) => state.user.userProfile,
      snackbars: (state) => state.snackbar.snackbars,
    }),
    avatar_url: {
      get() {
        return this.$store.state.user.avatar_url;
      },
      set() {},
    },
  },
  mounted() {
    this.$store.dispatch("user/setUserProfile", { id: this.$auth.user.id });
    this.setAvatar();
  },
  methods: {
    handleErrors() {
      this.$store.dispatch("snackbar/setSnackbar", { color: "red", text: "Program Creation Failed!", timeout: 3000 });
    },
    removeSnackbar(snackbar) {
      this.$store.dispatch("snackbar/remove", snackbar);
    },
    async setAvatar() {
      if (this.user) {
        if (this.user.image) this.avatar_url = `${this.$axios.defaults.baseURL}${this.user.image.url}`;
        else this.avatar_url = "/avatar-default-icon.png";
      } else this.avatar_url = "/avatar-default-icon.png";
    },
    async logout() {
      await this.$auth.logout();
      window.location.reload();
    },
  },
};
</script>

<style scoped>
.menu-title {
  font-size: 14px;
  font-weight: normal;
  color: #f5f5f5;
}
.name-title {
  font-size: 14px;
}
.name-subtitle {
  font-size: 12px;
}

.chivron {
  border-left: 5px solid green;
}
</style>
