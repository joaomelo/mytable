import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

function prettyDate(now) {
  const today = now;
  const date = today.getMonth() + 1 + '-' + today.getDate();
  const time =
    today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
  return date + ' ' + time;
}

export default new Vuex.Store({
  state: {
    messages: []
  },
  mutations: {
    clear(state) {
      state.messages = [];
    },
    addMessage(state, string) {
      const now = new Date();

      state.messages.unshift({
        id: now,
        when: prettyDate(now),
        text: string
      });
    }
  }
});
