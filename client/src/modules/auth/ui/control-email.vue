<template>
  <v-text-field
    prepend-icon="mdi-account-circle"
    label="Email"
    :rules="emailRules"
    required
    @input="input"
  />
</template>

<script>
export default {
  name: 'ControlEmail',
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      emailRules: [
        v => !!v || 'Email is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
      ]
    };
  },
  methods: {
    input (text) {
      this.$emit('input', text);
    }
  }
};
</script>
