<template>
  <div>
    <v-tabs
      background-color="light-green lighten-5"
      color="green darken-3"
      light
      vertical
    >
      <v-tab>
        <v-icon small class="pr-2">mdi mdi-account-plus</v-icon>Create New User
      </v-tab>
      <v-tab>
        <v-icon small class="pr-2">mdi mdi-account-plus</v-icon>Department List
      </v-tab>

      <v-tab-item>
        <v-container fluid>
          <CreateUser />
        </v-container>
      </v-tab-item>
      <v-tab-item> 
        <ManageDepartment />
      </v-tab-item>
    </v-tabs>
  </div>
</template>

<script>
export default {
  layout: "super",
  
};
</script>
