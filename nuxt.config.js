import colors from "vuetify/es5/util/colors";

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: "static",

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: "%s - " + process.env.npm_package_description,
    title: process.env.npm_package_description || "",
    meta: [{ charset: "utf-8" }, { name: "viewport", content: "width=device-width, initial-scale=1" }, { hid: "description", name: "description", content: process.env.npm_package_description || "" }],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons" },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["@/assets/style.css", "@/assets/vuetify/overrides.scss"],
  router: {
    middleware: ["auth"],
  },
  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: "~/plugins/moment.js" },
    { src: "~/plugins/vue-apexchart.js", ssr: false },
    { src: "~/plugins/highcharts-vue.js" },
    { src: "~/plugins/TiptapVuetify", mode: "client" },
    { src: "~/plugins/v-calendar", ssr: false },
    "~plugins/vue-gallery.client.js",
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,
  loading: "~/components/armsLoader.vue",

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    "@nuxtjs/vuetify",
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",
    "@nuxtjs/auth",
    "vue-scrollto/nuxt",
    "nuxt-clipboard2",
  ],
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: {
            headers: { "Content-type": "application/json" },
            url: "/auth/local",
            method: "post",
            propertyName: "jwt",
          },
          logout: false,
          user: {
            headers: { "Content-type": "application/json" },
            url: "/users/me",
            method: "get",
            propertyName: false,
          },
        },
        tokenType: "Bearer",
      },
    },
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: "http://14.139.159.112:1338",
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ["~/assets/variables.scss"],
    treeShake: true,
    theme: {
      dark: false,
      default: "light",
      disable: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
        light: {
          primary: "#1976D2",
          secondary: "#424242",
          accent: "#82B1FF",
          error: "#FF5252",
          info: "#2196F3",
          success: "#4CAF50",
          warning: "#FB8C00",
        },
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    vendor: ["vue-apexchart"],
  },
};
