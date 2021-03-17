<template>
 <div>
  <v-data-table
    :headers="headers"
    :items="departments"
    :sort-by="sortBy"
    :sort-desc="desc"
    :search="search"
    class="elevation-1"
    :loading="loading"
    loading-text="Loading... Please wait"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>Departments</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on }">
            <v-btn color="success" dark small class="mb-2" v-on="on">New Department</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-text-field v-model="editedItem.name" label="Department name"></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="save">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary">Reset</v-btn>
    </template>
  </v-data-table>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import Swal from 'sweetalert2'
  export default {
    data: () => ({
      dialog: false,
      search: '',
      headers: [
        {
          text: 'Department Name',
          align: 'start',
          sortable: true,
          value: 'name',
        },
        { text: 'Status', value: 'status' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      desserts: [],
      editedIndex: -1,
      editedItem: {
        name: '',
        status: true,
      },
      defaultItem: {
        name: '',
        status: true,
      },
      loading: false,
      sortBy: "name",
      desc: false
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Department' : 'Edit Department'
      },
      ...mapState({
        departments: state => state.department.departments
      })
      // departments() {
      //   return this.$store.state.department.departments;
      // }
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
    },

    created () {
      this.$store.dispatch('department/getDepartments')
    },

    methods: {
      editItem (item) {
        this.editedIndex = this.departments.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        const index = item.id
        confirm('Are you sure you want to delete this item?') && 
          this.$axios.$delete(`/departments/${index}`)
            .then(resp => {
              Swal.fire({
                title: 'Deleted!',
                text: 'Department deleted Successfully',
                icon: 'success',
                showConfirmButton: false,
                timer: 1500
              })
              this.loading= true;
              this.$store.dispatch('department/getDepartments').then().catch().finally(this.loading=false)
            })
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      save () {
        this.loading = true;
        if (this.editedIndex > -1) {
          console.log('Editing: ', this.editedItem);
          var payload = Object.assign({
            id: this.editedItem.id,
            name: this.editedItem.name
          });
          // console.log(payload)
          this.$axios.$put(`/departments/${payload.id}`, payload)
            .then(resp => {
              Swal.fire({
                title: 'Updated!',
                text: 'Department updated Successfully',
                icon: 'success',
                showConfirmButton: false,
                timer: 1500
              })
              this.loading= true;
              this.$store.dispatch('department/getDepartments').then().catch().finally(this.loading=false)
            })
            .catch((e) => {
              this.$store.dispatch('snackbar/setSnackbar', {color: 'red', text: 'Something Wrong!', timeout: 3000}, {root: true});
            })
            .finally(this.loading = false)
        } else {
          var payload = Object.assign({},this.editedItem);
          console.log('i think it new: ', payload);
          this.$store.dispatch('department/addDepartment', payload).then(resp=> {}).catch((e)=>{}).finally(this.loading = false, this.sortBy = 'id', this.desc=true)
          // this.departments.push(this.editedItem)
        }
        this.close()
      },
    },
  }
</script>