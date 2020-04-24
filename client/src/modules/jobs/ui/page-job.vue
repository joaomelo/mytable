<template>
  <v-row
    justify="center"
  >
    <v-col>
      <v-card>
        <v-card-text>
          <v-form ref="form">
            <h2>Database</h2>
            <v-text-field
              v-model="job.apiKey"
              label="Api Key"
              :rules="[v => !!v || 'Api Key is required']"
            >
              <template v-slot:append>
                <InputTooltip
                  hint="Before sharing your key be aware this is a hobbie project. Althougth i took security measures, depeding on you risk appitite you will better served running an instance of this app on your own."
                />
              </template>
            </v-text-field>

            <v-text-field
              v-model="job.baseId"
              label="Base"
              :rules="[v => !!v || 'Base Id is required']"
            >
              <template v-slot:append>
                <InputTooltip
                  hint="The base id where your table to run the transformations is located"
                />
              </template>
            </v-text-field>

            <v-text-field
              v-model="job.tableName"
              label="Table"
              :rules="[v => !!v || 'Table name is required']"
            >
              <template v-slot:append>
                <InputTooltip
                  hint="The name of the table inside the base. Always test this app in a copy of your table before comminting to use it."
                />
              </template>
            </v-text-field>
            <v-divider class="my-5" />

            <h2>Tree Setup</h2>
            <v-text-field
              v-model="job.titleField"
              label="Title Field"
              :rules="[v => !!v || 'Title is required']"
            >
              <template v-slot:append>
                <InputTooltip
                  hint="The primary text identification of your items. Is used on path strings, for example."
                />
              </template>
            </v-text-field>

            <v-text-field
              v-model="job.parentField"
              label="Parent Field"
              :rules="[v => !!v || 'Parent is required']"
            >
              <template v-slot:append>
                <InputTooltip
                  hint="Link field that points to another items in the same table to form the tree structure."
                />
              </template>
            </v-text-field>

            <v-text-field
              v-model="job.pathField"
              label="Field for Path"
              :rules="[v => !!v || 'Path is required']"
            >
              <template v-slot:append>
                <InputTooltip
                  hint="Text field that will be filled with the tree structured of that item based on parent value. They are important to order items next to their parent and siblings"
                />
              </template>
            </v-text-field>

            <v-text-field
              v-model="job.levelTitleSymbol"
              label="Level Symbol"
              maxlength="1"
            >
              <template v-slot:append>
                <InputTooltip
                  hint="One instance of this character for every item level will be inserted before the title original value. This help visualize the tree structure. If left blank, no char will be prepended."
                />
              </template>
            </v-text-field>

            <v-divider class="my-5" />
            <h2>Status Setup</h2>
            <v-text-field
              v-model="job.statusField"
              label="Status Field"
            >
              <template v-slot:append>
                <InputTooltip
                  hint="Status are used to form better path strings and to control recursive task creation. But they are optional."
                />
              </template>
            </v-text-field>

            <v-checkbox
              v-model="job.prependStatusToPath"
              label="Prepend Status in Path?"
              class="my-0"
              :disabled="!job.statusField"
            >
              <template v-slot:append>
                <InputTooltip
                  hint="If you use emojis for item status -- like 🙂, 🚧 and ✔️ -- you could check this option to prepend then in path string. This is usefull to order items considering status."
                />
              </template>
            </v-checkbox>
            <v-combobox
              v-model="job.inactiveStatuses"
              label="Inactive Status"
              chips
              deletable-chips
              multiple
              :disabled="!job.statusField"
            >
              <template v-slot:append>
                <InputTooltip
                  hint="The values of status that represent inactive items like 'done' and 'cancel'. Only matter in recurrence logic."
                />
              </template>
            </v-combobox>

            <v-divider class="my-5" />
            <h2>Recurrence Setup</h2>
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
            <v-divider class="my-5" />
            <h2>Error Feedback</h2>
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
import { loader } from '__cli/core/loader';
import { InputTooltip } from '__cli/core/base';
import { getJobsCollection } from '../domain';

export default {
  name: 'PageJob',
  components: { InputTooltip },
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      jobsCollection: undefined,
      job: {}
    };
  },
  watch: {
    'job.statusField': function (value) {
      if (!value) {
        this.job.prependStatusToPath = false;
        this.job.inactiveStatuses = [];
      }
    }
  },
  mounted () {
    loader.start();
    getJobsCollection().then(jobsCollection => {
      this.jobsCollection = jobsCollection;
      if (this.id !== 'add') {
        const getItemPromise = this.jobsCollection.getItem(this.id);
        getItemPromise.then(item => {
          this.job = { ...item };
          loader.stop();
        });
      } else {
        loader.stop();
      }
    });
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
