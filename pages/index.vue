<template>
  <div></div>
</template>
<script>
export default {
	middleware: "auth",
	
  mounted() {
    if (this.$auth.loggedIn) {
      if (this.$auth.user.userType === "SUPER_ADMIN") {
				// this.$store.dispatch("setUserData", data.data.user);
				console.log(this.$auth.user)
				this.$router.push("/super");
				
      } else this.$router.push("/admin");
    }
  },
};
</script>
