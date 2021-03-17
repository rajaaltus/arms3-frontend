<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      src="/dashboard_back_1.jpg"
      :mini-variant.sync="mini"
      floating
      permanent
      app
      dark
    >
    <div class="py-3" style="max-height:400px">
      <v-list-item v-if="!mini" >
        
        <v-img src="/logo.png" max-width="30%"></v-img>
        
      </v-list-item>
      <v-list-item v-else style="max-height:200px">
        <v-img src="/logo.png" max-width="100%"></v-img>
       
      </v-list-item>
      </div>
      <v-divider></v-divider>
      <v-list-item class="px-2">
        <v-list-item-avatar>
          <v-img :src="userData.avatar?`${$axios.defaults.baseURL}${userData.avatar.url}`:'/avatar-default-icon.png'"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>ARMS Administrator</v-list-item-title>
        </v-list-item-content>
      </v-list-item>


      <v-list-item nav link @click="logout">
        <v-list-item-icon>
          <v-icon color="red darken-2">mdi-logout</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title class="menu-title">Logout</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>

      <v-list>
        <v-list-item :to="item.to" router exact v-for="(item,index) in items" :key="index" link>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title class="menu-title">{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar flat dense app color="#fff">
      <v-app-bar-nav-icon @click.stop="mini = !mini" />
      <v-spacer></v-spacer>
    </v-app-bar>
    <v-main>
      <v-container fluid>
        <nuxt />
      </v-container>
    </v-main>
    <v-snackbar
      v-for="(snackbar, index) in snackbars.filter(s => s.showing)"
      right
      top
      :key="snackbar.text + Math.random()"
      :value="snackbar.showing"
      @input="removeSnackbar(snackbar)"
      :timeout="snackbar.timeout"
      :color="snackbar.color"
      :style="`top: ${(index * 60) + 8}px`"
    >
      {{snackbar.text}}

      <v-btn text @click="removeSnackbar(snackbar)">
        Close
      </v-btn>
    </v-snackbar>
  </v-app>
</template>

<script>
import { mapState } from "vuex";
export default {
  head() {
    return {
      title: "ARMS Admin - " + this.$route.name,
    };
  },
  
  data() {
    return {
      drawer: true,
      mini: true,
      items: [
        // { title: "Annual Reports", icon: "mdi-view-split-horizontal", to: '/super'},
        { title: "Monthly Reports", icon: "mdi-chart-areaspline", to: '/super/month'},
        { title: "Generate Quick Reports", icon: "mdi-file-eye", to: '/super/quick'},
        { title: "Settings", icon: "mdi-shape-circle-plus", to: '/super/department' },
      ],
    };
  },
  computed: {
    ...mapState({
      userData: (state) => state.userData,
      snackbars: state => state.snackbar.snackbars
    }),
  },
  mounted() {
    
  },
  methods: {
    async logout() {
      await this.$auth.logout();
      window.location.reload();
    },
    removeSnackbar(snackbar) {
      this.$store.dispatch('snackbar/remove', snackbar)
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