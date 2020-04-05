<template>
  <v-row
    justify="center"
  >
    <v-col>
      <v-card>
        <v-card-text>
          <v-form ref="form">
            <v-text-field
              v-model="profile.email"
              label="Email"
              readonly
            />
            <v-text-field
              v-model="profile.apiKey"
              label="Api Key"
              :rules="[v => !!v || 'Api Key is required']"
            />
            <v-text-field
              v-model="profile.baseId"
              label="Airtable Base Id"
              :rules="[v => !!v || 'Base Id is required']"
            />
          </v-form>
        </v-card-text>
        <v-divider />
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="info"
            @click="cancel"
          >
            Cancel
          </v-btn>
          <v-btn
            color="success"
            @click="save"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { getProfile, updateProfile } from '../domain';
export default {
  name: 'PageProfile',
  data () {
    return {
      profile: {}
    };
  },
  created () {
    getProfile().then(profile => { this.profile = { ...profile }; });
  },
  methods: {
    save () {
      if (this.$refs.form.validate()) {
        updateProfile(this.profile);
        this.$router.go(-1);
      }
    },
    cancel () {
      this.$router.go(-1);
    }
  }
};
</script>
