<template>
  <div id="version" class="float-right text-muted">
    <small>{{ tag }}</small>
  </div>
</template>
<script>
import * as data from "../package.json";
export default {
  name: "Version",
  data() {
    return {
      tag:
        process.env.NODE_ENV == "development"
          ? "dev"
          : `v${data.default.version}`
    };
  }
};
</script>