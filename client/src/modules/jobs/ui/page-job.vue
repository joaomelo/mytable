<template>
  <v-row
    justify="center"
  >
    <v-col>
      <v-card :loading="status === 'LOADING'">
        <v-card-text>
          <v-form ref="form">
            <v-text-field
              v-model="job.apiKey"
              label="Api Key"
              :rules="[v => !!v || 'Api Key is required']"
            />
            <v-text-field
              v-model="job.baseId"
              label="Airtable Base Id"
              :rules="[v => !!v || 'Base Id is required']"
            />
            <v-text-field
              v-model="job.tableName"
              label="Table"
              :rules="[v => !!v || 'Table name is required']"
            />
            <v-text-field
              v-model="job.titleField"
              label="Field for Title"
              :rules="[v => !!v || 'Title is required']"
            />
            <v-text-field
              v-model="job.parentField"
              label="Field for Parent"
              :rules="[v => !!v || 'Title is required']"
            />
            <v-text-field
              v-model="job.pathField"
              label="Field for Path"
              :rules="[v => !!v || 'Path is required']"
            />
            <v-text-field
              v-model="job.levelTitleSymbol"
              label="Symbol to represent path level in titles"
              :rules="[v => !!v || 'Level symbol is required']"
            />
            <v-text-field
              v-model="job.statusField"
              label="Field name for Status"
            />
            <v-checkbox
              v-model="job.prependStatusToPath"
              label="Prepend Status in Path?"
              class="mt-0"
            />
            <v-combobox
              v-model="job.inactiveStatuses"
              label="Inactive statuses"
              append-icon=""
              chips
              deletable-chips
              multiple
            />
            <v-text-field
              v-model="job.frequencyField"
              label="Field for Frequency"
              :rules="[v => !!v || 'Frequency is required']"
            />
            <v-text-field
              v-model="job.recurrenceTypeField"
              label="Field for Recurrence Type"
              :rules="[v => !!v || 'Recurrence Type Field is required']"
            />
            <v-text-field
              v-model="job.intervalField"
              label="Field for Recurrence Interval"
              :rules="[v => !!v || 'Interval Field is required']"
            />
            <v-text-field
              v-model="job.isStartField"
              label="Checkbox Field to Start or End Patter"
              :rules="[v => !!v || 'isStart Field is required']"
            />
            <v-text-field
              v-model="job.startDateField"
              label="Field for Start Date"
              :rules="[v => !!v || 'Start Date is required']"
            />
            <v-text-field
              v-model="job.endDateField"
              label="Field for End Date"
              :rules="[v => !!v || 'End Date is required']"
            />
            <v-combobox
              v-model="job.extraInstanceFields"
              label="Extra fields to be copied by instance"
              append-icon=""
              chips
              deletable-chips
              multiple
            />
            <v-text-field
              v-model="job.errorField"
              label="Field for Error loging"
              :rules="[v => !!v || 'Error field is required']"
            />
          </v-form>
        </v-card-text>
        <v-divider />
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="secondary"
            @click="cancel"
          >
            <v-icon left>
              mdi-cancel
            </v-icon>
            Cancel
          </v-btn>
          <v-btn
            color="success"
            @click="save"
          >
            <v-icon left>
              mdi-content-save
            </v-icon>
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { getJobsCollection } from '../domain';

export default {
  name: 'PageJob',
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      jobsCollection: getJobsCollection(),
      status: 'IDLE',
      job: {}
    };
  },
  mounted () {
    if (this.id !== 'add') {
      this.status = 'LOADING';
      const getItemPromise = this.jobsCollection.getItem(this.id);
      getItemPromise.then(item => {
        this.job = { ...item };
        this.status = 'IDLE';
      });
    }
  },
  methods: {
    save () {
      if (this.$refs.form.validate()) {
        if (this.id === 'add') {
          this.jobsCollection.add(this.job);
        } else {
          this.jobsCollection.set(this.job);
        }
        this.$router.go(-1);
      }
    },
    cancel () {
      this.$router.go(-1);
    }
  }
};
</script>
