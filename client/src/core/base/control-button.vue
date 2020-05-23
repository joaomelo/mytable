<template>
  <v-btn
    :color="color"
    @click="$emit('click')"
  >
    <v-icon
      v-if="icon"
      left
    >
      {{ icon }}
    </v-icon>
    {{ text }}
  </v-btn>
</template>

<script>
export default {
  name: 'ControlButton',
  props: {
    color: {
      type: String,
      default: 'primary'
    },
    icon: {
      type: String,
      default: ''
    },
    text: {
      type: String,
      required: true
    }
  }
};
</script>
