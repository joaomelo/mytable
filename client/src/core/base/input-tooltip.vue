<template>
  <v-tooltip
    bottom
    max-width="300"
  >
    <template v-slot:activator="{ on }">
      <v-icon v-on="on">
        mdi-help-circle-outline
      </v-icon>
    </template>
    {{ hint }}
  </v-tooltip>
</template>

<script>
export default {
  name: 'InputTooltip',
  props: {
    hint: {
      type: String,
      required: true
    }
  }
};
</script>

<style>

</style>
