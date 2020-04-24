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
              :rules="[requiredRule]"
            >
              <template v-slot:append>
                <InputTooltip
                  hint="Before sharing your key be aware this is a hobby project. Although i took security measures, depending on your risk appetite you will better be served running an instance of this app on your own."
                />
              </template>
            </v-text-field>

            <v-text-field
              v-model="job.baseId"
              label="Base"
              :rules="[requiredRule]"
            >
              <template v-slot:append>
                <InputTooltip
                  hint="The id of the base where your table is located."
                />
              </template>
            </v-text-field>

            <v-text-field
              v-model="job.tableName"
              label="Table"
              :rules="[requiredRule]"
            >
              <template v-slot:append>
                <InputTooltip
                  hint="The table's name which myairtable will run the job. Always test in a copy of your table before committing to use it."
                />
              </template>
            </v-text-field>
            <v-divider class="my-5" />

            <h2>Tree Setup</h2>
            <v-text-field
              v-model="job.titleField"
              label="Title Field"
              :rules="[requiredRule]"
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
              :rules="[requiredRule]"
            >
              <template v-slot:append>
                <InputTooltip
                  hint="Link field that points to another item in the same table. This will form the tree structure."
                />
              </template>
            </v-text-field>

            <v-text-field
              v-model="job.pathField"
              label="Field for Path"
              :rules="[requiredRule]"
            >
              <template v-slot:append>
                <InputTooltip
                  hint="A text field that will be filled with the tree structure of an item. They are important to order items next to their parent and siblings."
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
                  hint="One instance of this character for every item level will be inserted before the title's original value. This helps visualizes the tree structure. If left blank, no char will be prepended."
                />
              </template>
            </v-text-field>

            <v-divider class="my-5" />
            <h2>Status Setup</h2>
            <v-text-field
              v-model="job.statusField"
              :rules="requiredIfRecurrenceRules"
              label="Status Field"
            >
              <template v-slot:append>
                <InputTooltip
                  hint="Status is used to form better path strings and to control recursive task creation."
                />
              </template>
            </v-text-field>

            <v-checkbox
              v-model="job.prependStatusToPath"
              label="Prepend Status in Path"
              class="my-0"
              :disabled="!job.statusField"
            >
              <template v-slot:append>
                <InputTooltip
                  hint="If you use emojis for item status -- like 🙂, 🚧 and ✔️ -- you could check this option to prepend then in the path string. This is useful to order items considering status."
                />
              </template>
            </v-checkbox>
            <v-combobox
              v-model="job.inactiveStatuses"
              label="Inactive Status"
              chips
              deletable-chips
              :rules="requiredIfRecurrenceRules"
              multiple
              :disabled="!job.statusField"
            >
              <template v-slot:append>
                <InputTooltip
                  hint="The values of status that represent inactive items like 'done' and 'cancel'. It only matters if recurrence is enabled."
                />
              </template>
            </v-combobox>

            <v-divider class="my-5" />
            <h2>Recurrence Setup</h2>
            <v-checkbox
              ref="recurrenceCheckbox"
              v-model="job.isRecurrenceEnabled"
              label="Enable Recurrence?"
              class="mt-1"
            >
              <template v-slot:append>
                <InputTooltip
                  hint="If enabled, myairtable will search for recurring items where all children are inactive. Then, will create new instances respecting the item recurrence setup."
                />
              </template>
            </v-checkbox>

            <v-text-field
              v-model="job.recurrenceTypeField"
              :disabled="!job.isRecurrenceEnabled"
              label="Recurrence Type Field"
            >
              <template v-slot:append>
                <InputTooltip
                  hint="The name of the text field where myairtable will save an emoji signaling if the item is recurring or not. Useful to filter items."
                />
              </template>
            </v-text-field>

            <v-text-field
              v-model="job.frequencyField"
              label="Frequency Field"
              :rules="requiredIfRecurrenceRules"
              :disabled="!job.isRecurrenceEnabled"
            >
              <template v-slot:append>
                <InputTooltip
                  hint="Text or single select field. The field can hold one of these four values: 'daily', 'weekly', 'monthly' or 'yearly'"
                />
              </template>
            </v-text-field>

            <v-text-field
              v-model="job.intervalField"
              :disabled="!job.isRecurrenceEnabled"
              :rules="requiredIfRecurrenceRules"
              label="Recurrence Interval Field"
            >
              <template v-slot:append>
                <InputTooltip
                  hint="Number field that represents how many days, weeks, months, or years item's instances should be put apart. For example, an item that recurs once every semester will have a 'monthly' frequency with an interval equal to 6."
                />
              </template>
            </v-text-field>

            <v-text-field
              v-model="job.isStartField"
              :disabled="!job.isRecurrenceEnabled"
              :rules="requiredIfRecurrenceRules"
              label="Checkbox Field to Start or End Patter"
            >
              <template v-slot:append>
                <InputTooltip
                  hint="Checkbox type field. Your recurring items could have new instances created based on their start or end date. This field, if checked on an item, says to myairtable that the start date should be used as a reference."
                />
              </template>
            </v-text-field>

            <v-text-field
              v-model="job.startDateField"
              :disabled="!job.isRecurrenceEnabled"
              :rules="requiredIfRecurrenceRules"
              label="Field for Start Date"
            >
              <template v-slot:append>
                <InputTooltip
                  hint="Date type field that holds the start date of your items."
                />
              </template>
            </v-text-field>

            <v-text-field
              v-model="job.endDateField"
              label="Field for End Date"
              :disabled="!job.isRecurrenceEnabled"
              :rules="requiredIfRecurrenceRules"
            >
              <template v-slot:append>
                <InputTooltip
                  hint="Date type field that holds the end date of your items."
                />
              </template>
            </v-text-field>
            <v-combobox
              v-model="job.extraInstanceFields"
              label="Extra fields"
              append-icon=""
              chips
              :disabled="!job.isRecurrenceEnabled"
              deletable-chips
              multiple
            >
              <template v-slot:append>
                <InputTooltip
                  hint="Every time an instance for a recurring item is created, the value of the fields informed here will be copied over to those instances."
                />
              </template>
            </v-combobox>
            <v-divider class="my-5" />
            <h2>Error Feedback</h2>
            <v-text-field
              v-model="job.errorField"
              :rules="[requiredRule]"
              label="Error Field"
            >
              <template v-slot:append>
                <InputTooltip
                  hint="Myairtable checks for inconsistences when processing your table's items. It identifies an item with no title or that point to itself as a parent, for example. If you inform a text filed here, a message will be applied to items with errors. It is useful to create a filter with bugged items."
                />
              </template>
            </v-text-field>
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
      job: {},
      requiredRule (v) {
        return !!v || 'Field is required';
      }
    };
  },
  computed: {
    requiredIfRecurrenceRules () {
      const rules = [];
      if (this.job.isRecurrenceEnabled) {
        rules.push(this.requiredRule);
      }
      return rules;
    }
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
