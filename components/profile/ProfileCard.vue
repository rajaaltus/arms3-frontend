<template>
  <div>
    <v-card tile class="mx-auto my-card">
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="headline">{{ username }}</v-list-item-title>
          <v-list-item-subtitle>{{ profile.designation }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <div>
        <v-hover>
          <template v-slot:default="{ hover }">
            <v-img :src="image && image.url !== null ? `${$axios.defaults.baseURL}${image.url}` : '/image_placeholder.png'" class="mt-3" max-width="100%">
              <v-progress-linear :active="imgLoader" :indeterminate="imgLoader" absolute bottom color="deep-purple accent-4"></v-progress-linear>
              <v-fade-transition>
                <v-overlay v-if="hover" absolute color="#00564c">
                  <v-btn @click="$refs.image.click()">
                    {{ image && image.url ? "Edit Image" : "Upload Image" }}
                  </v-btn>
                  <v-btn v-if="image" class="mt-0" x-small fab dark color="red darken-3" @click="deleteImage(image.id)">
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </v-overlay>
              </v-fade-transition>
            </v-img>
          </template>
        </v-hover>
        <input ref="image" type="file" accept="image/png, image/jpeg" style="display: none;" label="File input" @change="handleFileUpload" />
      </div>
      <!-- <v-img
        v-if="image_url !== null"
        :src="`${$axios.defaults.baseURL}${image_url}`"
        height="auto"
      ></v-img>
      <v-img v-else src="/image_placeholder.png" height="auto"></v-img> -->

      <v-card-text>
        <v-icon small color="red" class="mdi mdi-email-outline mr-3"></v-icon>
        <span class="body-2">{{ profile.personal_email }}</span
        ><br />
        <v-icon small color="blue" class="mdi mdi-phone mr-3"></v-icon>
        <span class="body-2">{{ profile.contact_no }}</span>
      </v-card-text>
    </v-card>
    <v-card tile>
      <v-card-title> <v-icon color="green" class="pr-1">mdi-link</v-icon> Public Profile Link </v-card-title>
      <v-card-text>
        <nuxt-link :to="`/profile/${profile.employee_id}`">
          <div v-if="publicProfile">
            {{ "http://arms.nimhans.ac.in/profile/" + profile.employee_id }}
          </div>
        </nuxt-link>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import { mapState } from "vuex";
export default {
  props: ["profile"],
  data() {
    return {
      imgLoader: false,
      image: null,
      imageToDelete: null,
      publicProfile: false,
    };
  },
  computed: {
    username() {
      return this.$store.state.user.userProfile.name;
    },
  },
  mounted() {
    console.log(this.profile);
    this.publicProfile = this.profile.active_status;
    if (this.profile.image !== null) this.image = this.profile.image;
    // console.log('its not null')
    // else
    //   console.log('its null')
  },
  methods: {
    async deleteImage(id) {
      await this.$store.dispatch("deleteFile", { id: id });
      this.image = null;
    },
    async handleFileUpload(event) {
      this.imgLoader = true;
      if (this.image && this.image.url !== null) {
        this.imageToDelete = this.profile.image.id;
        this.selectedFile = event.target.files[0];
        const data = new FormData();
        data.append("files", this.selectedFile);
        const uploadRes = await this.$axios({
          method: "POST",
          url: "/upload",
          data,
        });
        this.image = uploadRes.data[0];
        var payload = Object.assign(
          {},
          {
            id: this.profile.id,
            image: uploadRes.data[0].id,
          }
        );
        var userPayload = Object.assign(
          {},
          {
            id: this.$auth.user.id,
            avatar: uploadRes.data[0].id,
          }
        );
        this.$store
          .dispatch("user/updateUserProfile", payload)
          .then((resp) => {
            Swal.fire({
              title: "Success",
              text: "Updated Successfully!",
              icon: "success",
              showConfirmButton: false,
              timer: 1500,
            });

            if (this.imageToDelete) {
              this.$store.dispatch("deleteFile", { id: this.imageToDelete });
              this.imageToDelete = null;
            }
          })
          .catch((err) => {
            Swal.fire({
              title: "Something Wrong!",
              text: err,
              icon: "warning",
              showConfirmButton: false,
              timer: 4500,
            });
          });
        this.$store.dispatch("user/updateUser", userPayload);
      } else {
        this.profile.image = null;
        this.selectedFile = event.target.files[0];
        const data = new FormData();
        data.append("files", this.selectedFile);
        const uploadRes = await this.$axios({
          method: "POST",
          url: "/upload",
          data,
        });
        this.image = uploadRes.data[0];
        var payload = Object.assign(
          {},
          {
            id: this.profile.id,
            image: uploadRes.data[0].id,
          }
        );
        var userPayload = Object.assign(
          {},
          {
            id: this.$auth.user.id,
            avatar: uploadRes.data[0].id,
          }
        );
        this.$store
          .dispatch("user/updateUserProfile", payload)
          .then((resp) => {
            Swal.fire({
              title: "Success",
              text: "Updated Successfully!",
              icon: "success",
              showConfirmButton: false,
              timer: 1500,
            });

            if (this.imageToDelete) {
              this.$store.dispatch("deleteFile", { id: this.imageToDelete });
              this.imageToDelete = null;
            }
          })
          .catch((err) => {
            Swal.fire({
              title: "Something Wrong!",
              text: err,
              icon: "warning",
              showConfirmButton: false,
              timer: 4500,
            });
          });
        this.$store.dispatch("user/updateUser", userPayload);
      }
      this.imgLoader = false;
    },
  },
};
</script>
