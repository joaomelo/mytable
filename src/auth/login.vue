<template>
  <div id="login-ui-container-id"></div>
</template>

<script>
export default {
  name: "Login",
  mounted() {
    this.$auth.startLoginUi("login-ui-container-id");
  }
};
</script>

<style src="firebaseui/dist/firebaseui.css"></style>