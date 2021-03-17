<template>
  <div>
    <v-dialog v-model="dialog" persistent max-width="60%">
      <v-card>
        <v-card-title>
          <span class="headline">Update Qualification Details</span>
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12" md="3" lg="3">
              <v-text-field
                color="green"
                v-model="editedItem.qualification"
                label="Degree"
                :rules="[v => !!v || 'Please Enter your Degree Name']"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="5" lg="5">
              <v-text-field
                color="green"
                v-model="editedItem.institute"
                label="Institute &amp; Place"
                :rules="[v => !!v || 'Please Enter Institute Name']"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="2" lg="2">
              <v-menu
                ref="menu"
                v-model="editedFrom"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="editedItem.duration_from"
                    :return-value.sync="editedFrom"
                    :rules="[v => !!v || 'Item is required']"
                    readonly
                    label="From"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="editedItem.duration_from"
                  color="green lighten-1"
                  no-title
                  scrollable
                >
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="reset">
                    Cancel
                  </v-btn>
                  <v-btn
                    text
                    color="primary"
                    @click="$refs.menu.save(editedFrom)"
                  >
                    OK
                  </v-btn>
                </v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="12" md="2" lg="2">
              <v-menu
                ref="menu1"
                v-model="editedTo"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="editedItem.duration_to"
                    :rules="[v => !!v || 'Item is required']"
                    :return-value.sync="editedTo"
                    readonly
                    label="To"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="editedItem.duration_to"
                  no-title
                  scrollable
                >
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="editeTo = false">
                    Cancel
                  </v-btn>
                  <v-btn
                    text
                    color="primary"
                    @click="$refs.menu1.save(editedTo)"
                  >
                    OK
                  </v-btn>
                </v-date-picker>
              </v-menu>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions class="pr-5">
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" small dark @click="dialog = false"
            >Close</v-btn
          >
          <v-btn color="green darken-1" small dark @click="save"
            ><v-icon small class="pr-2">mdi-content-save</v-icon>Save
          </v-btn>
        </v-card-actions>

        <!-- <pre>{{ editedItem }}</pre> -->
      </v-card>
    </v-dialog>
    <v-alert
      tile
      elevation="1"
      border="left"
      color="blue lighten-1"
      colored-border
      icon="mdi-hospital-building"
    >
      <h2 class="font-weight-bold mb-4">Qualifications</h2>

      <v-form ref="form" v-model="valid" lazy-validation v-if="form">
        <v-row>
          <v-col cols="12" lg="3">
            <v-text-field
              v-model="qualification.qualification"
              :rules="[v => !!v || 'Please type your Degree Name']"
              label="Degree"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" lg="5">
            <v-text-field
              v-model="qualification.institute"
              :rules="[v => !!v || 'Please type qualification']"
              label="Institution &amp; Place"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" lg="2">
            <v-menu
              ref="menu"
              v-model="from"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="qualification.duration_from"
                  :return-value.sync="from"
                  :rules="[v => !!v || 'Item is required']"
                  readonly
                  label="From Date"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="qualification.duration_from"
                color="green lighten-1"
                no-title
                scrollable
              >
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="reset">
                  Cancel
                </v-btn>
                <v-btn text color="primary" @click="$refs.menu.save(from)">
                  OK
                </v-btn>
              </v-date-picker>
            </v-menu>
          </v-col>
          <v-col cols="12" lg="2">
            <v-menu
              ref="menu1"
              v-model="to"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="qualification.duration_to"
                  :rules="[v => !!v || 'Item is required']"
                  :return-value.sync="to"
                  readonly
                  label="To Date"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="qualification.duration_to"
                no-title
                scrollable
              >
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="to = false">
                  Cancel
                </v-btn>
                <v-btn text color="primary" @click="$refs.menu1.save(to)">
                  OK
                </v-btn>
              </v-date-picker>
            </v-menu>
          </v-col>
        </v-row>

        <v-btn x-small color="success" class="mr-2" @click="addQualification">
          <v-icon small class="pr-1">mdi-plus</v-icon> Add
        </v-btn>

        <v-btn x-small color="error" class="mr-4" @click="reset">
          <v-icon small class="pr-1">mdi-reload</v-icon> Reset
        </v-btn>
      </v-form>
      <br>
      <v-card
        flat
        class="mb-3"
        v-for="(item, index) in qualifications"
        :key="index"
      >
          <v-chip label small color="light-blue darken-1 mb-2" dark>
            <span class="font-weight-normal">{{ item.qualification }}</span>
          </v-chip>
          <v-chip label small color="light-blue lighten-4 mb-2">{{ item.institute }}</v-chip>
          <v-chip label small color="light-blue lighten-5 mb-2">
            From {{ $moment(item.duration_from).format("YYYY") }} -
            to {{ $moment(item.duration_to).format("YYYY") }}
          </v-chip>
          
          <v-btn
            v-if="qEdit"
            @click="editQualification(item)"
            class="ml-2 mb-2"
            outlined
            x-small
            fab
            color="green"
          >
          <v-icon>mdi-pencil</v-icon>
          </v-btn>
          <v-btn
            v-if="qEdit"
            @click="deleteItem(item)"
            class="mb-2"
            outlined
            x-small
            fab
            color="red"
          >
          <v-icon @click="deleteItem(item)">mdi-delete</v-icon>
          </v-btn>
      </v-card>

      <v-layout align-end justify-end>
        <v-speed-dial
          v-model="fab"
          right
          open-on-hover
          direction="top"
          transition="slide-y-reverse-transition"
        >
          <template v-slot:activator>
            <v-btn
              v-model="fab"
              color="red darken-1"
              dark
              fab
              x-small
              @click="closeEdit"
            >
            <v-icon>{{ qEdit ? "mdi-close" : "mdi-pencil" }}</v-icon>
            </v-btn>
          </template>
          <v-btn fab dark x-small color="green" @click="activateForm">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
          <v-btn fab dark x-small color="indigo" @click="activateEdit">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
        </v-speed-dial>
      </v-layout>
    </v-alert>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import { mapState } from "vuex";
export default {
  props: ["qualifications"],
  data() {
    return {
      fab: null,
      dialog: false,
      editedFrom: false,
      editedTo: false,
      qEdit: false,
      form: false,
      to: false,
      qualification: {
        qualification: "",
        duration_from: "",
        duration_to: "",
        institute: "",
        deleted: false,
        user: 0
      },
      editedItem: {
        qualification: "",
        duration_from: "",
        duration_to: "",
        institute: "",
        deleted: false,
        user: 0
      }
    };
  },
  methods: {
    reset() {
      this.$refs.form.reset();
    },
    activateForm() {
      this.form = true;
      this.qEdit = true;
    },
    activateEdit() {
      this.form = false;
      this.qEdit = true;
    },
    closeEdit() {
      this.form = false;
      this.qEdit = false;
    },
    async addQualification() {
      if (this.$refs.form.validate()) {
        this.qualification.user = this.$store.state.auth.user.id;
        var payload = this.qualification;
        console.log(payload);
        await this.$store
          .dispatch("profile/addEducation", payload)
          .then(resp => {
            Swal.fire({
              title: "Added",
              text: "Your Qualification has been added successfully!",
              icon: "success",
              showConfirmButton: false,
              timer: 1500
            });
            this.$emit("new-qualification");
            this.reset();
            this.form=false;
          })
          .catch(e => {
          Swal.fire("something Wrong!");
        });
      }
    },
    editQualification(item) {
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    deleteItem(item) {
      this.$store.dispatch('profile/deleteEducation', {id: item.id})
      .then(resp => {
          Swal.fire({
            title: "Deleted",
            text: "removed successfully!",
            icon: "success",
            showConfirmButton: false,
            timer: 1500
          });
          this.$emit("new-qualification");
        })
        .catch(e => {
          Swal.fire("something Wrong!");
        });
    },
    save() {
      var payload = this.editedItem;
      this.$store
        .dispatch("profile/updateEducation", payload)
        .then(resp => {
          Swal.fire({
            title: "Added",
            text: "Your Qualification has been updated successfully!",
            icon: "success",
            showConfirmButton: false,
            timer: 1500
          });
          this.$emit("new-qualification");
        })
        .catch(e => {
          Swal.fire("something Wrong!");
        });
    }
  }
};
</script>
