<template>
  <v-content>
    <v-container
      fluid
      style="max-width: 400px;"
    >
      <v-row>
        <v-col
          cols="12"
          align="center"
        >
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
              v-if="alertMessage"
              :type="alertType"
              text
              class="mt-6"
            >
              {{ alertMessage }}
            </v-alert>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>

<script>
export default {
  name: 'LayoutDialog',
  props: {
    title: {
      type: String,
      default: 'my-table'
    },
    alertType: {
      type: String,
      default: 'error'
    },
    alertMessage: {
      type: String,
      default: ''
    }
  }
};
</script>
