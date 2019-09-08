<template>
  <div id="app" class="container">
    <div class="row">
      <div class="col">
        <Version />
      </div>
    </div>
    <div class="row">
      <div class="col">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import Version from "@/version";

export default {
  name: "App",
  components: { Version }
};
</script>