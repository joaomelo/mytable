<template>
  <v-text-field
    prepend-icon="mdi-account-circle"
    :label="label"
    :rules="emailRules"
    required
    :value="value"
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
    },
    label: {
      type: String,
      default: 'Email'
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
