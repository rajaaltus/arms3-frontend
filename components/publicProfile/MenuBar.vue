<template>
  <div class="back">
    <v-container>
      <v-row>
        <v-col cols="12" md="auto" style="padding: 0px 10px;">
          <v-icon small class="pr-1" color="black">mdi-lightbulb-on</v-icon>
          <span class="body-2 font-weight-normal black--text text-uppercase"
            >Profile ID: {{ userProfile.employee_id }}</span
          >
        </v-col>
        <v-col cols="12" md="4" style="padding: 0px 10px;">
          <v-icon small class="pr-1" color="black">mdi-account-edit</v-icon>
          <nuxt-link to="/user_profile"
            ><span class="body-2 font-weight-normal black--text text-uppercase"
              >Edit Profile</span
            ></nuxt-link
          >
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  props: ["userProfile"],
};
</script>

<style scoped>
.back {
  padding: 0px 0px;
  background-color: #f4bd2d;
  height: auto;
}</style
>>
