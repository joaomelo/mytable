<template>
  <div>
    <v-card>
      <v-card-title
        v-if="title"
        class="justify-center"
      >
        {{ title }}
      </v-card-title>
      <v-card-text>
        <slot />
      </v-card-text>
      <v-divider v-if="$slots.actions" />
      <v-card-actions>
        <v-spacer />
        <slot name="actions" />
      </v-card-actions>
    </v-card>
    <v-alert
      v-if="message"
      :type="messageType"
      text
      class="mt-2 text-center"
    >
      {{ message }}
    </v-alert>
  </div>
</template>

<script>
export default {
  name: 'BaseDialog',
  props: {
    title: {
      type: String,
      default: ''
    },
    message: {
      type: String,
      default: ''
    },
    messageType: {
      type: String,
      default: 'error'
    }
  }
};
</script>
