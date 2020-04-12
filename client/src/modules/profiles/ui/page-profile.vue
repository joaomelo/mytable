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
            <v-text-field
              v-model="profile.collection"
              label="Collection"
              :rules="[v => !!v || 'Collection is required']"
            />
            <v-text-field
              v-model="profile.titleField"
              label="Field for Title"
              :rules="[v => !!v || 'Title is required']"
            />
            <v-text-field
              v-model="profile.parentField"
              label="Field for Parent"
              :rules="[v => !!v || 'Title is required']"
            />
            <v-text-field
              v-model="profile.pathField"
              label="Field for Path"
              :rules="[v => !!v || 'Path is required']"
            />
            <v-text-field
              v-model="profile.statusField"
              label="Field for Status"
            />
            <v-text-field
              v-model="profile.statusEmojiField"
              label="Field for Status Emoji"
            />
            <v-text-field
              v-model="profile.frequencyField"
              label="Field for Frequency Type"
              :rules="[v => !!v || 'Frequency is required']"
            />
            <v-text-field
              v-model="profile.frequencyEmojiField"
              label="Field for Frequency Emoji"
              :rules="[v => !!v || 'Frequency Emoji Field is required']"
            />
            <v-text-field
              v-model="profile.intervalField"
              label="Field for Recurrence Interval"
              :rules="[v => !!v || 'Interval Field is required']"
            />
            <v-text-field
              v-model="profile.isStartField"
              label="Checkbox Field to Start or End Patter"
              :rules="[v => !!v || 'isStart Field is required']"
            />
            <v-text-field
              v-model="profile.startDateField"
              label="Field for Start Date"
              :rules="[v => !!v || 'Start Date is required']"
            />
            <v-text-field
              v-model="profile.endDateField"
              label="Field for End Date"
              :rules="[v => !!v || 'End Date is required']"
            />
            <v-text-field
              v-model="profile.errorField"
              label="Field for Error loging"
              :rules="[v => !!v || 'Error field is required']"
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
