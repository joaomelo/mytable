<template>
  <div>
    <v-text-field
      v-model="masterPassword"
      label="Password"
      prepend-icon="mdi-lock"
      :append-icon="showPassword ? 'mdi-eye': 'mdi-eye-off'"
      :type="showPassword ? 'text': 'password'"
      required
      :rules="masterRules"
      @click:append="showPassword = !showPassword"
      @input="input"
    />
    <v-text-field
      v-if="shouldMatch"
      v-model="slavePassword"
      label="Repeat password"
      prepend-icon="mdi-lock"
      :type="showPassword ? 'text': 'password'"
      required
      :rules="slaveRules"
    />
  </div>
</template>

<script>
export default {
  name: 'ControlPassword',
  props: {
    shouldMatch: {
      type: Boolean,
      default: false
    },
    value: {
      type: String,
      default: ''
    }
  },
  data () {
    const requireRule = v => !!v || 'Password is required';
    const matchRule = v => this.masterPassword === this.slavePassword || 'Passwords must match';

    return {
      showPassword: false,
      masterPassword: null,
      slavePassword: null,
      masterRules: [requireRule],
      slaveRules: [requireRule, matchRule]
    };
  },
  methods: {
    input (text) {
      this.$emit('input', text);
    }
  }
};
</script>
