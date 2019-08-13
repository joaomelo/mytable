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
    key: 1,
    messages: []
  },
  mutations: {
    clear(state) {
      state.key = 1;
      state.messages = [];
    },
    addMessage(state, string) {
      state.messages.push({
        id: state.key++,
        when: prettyDate(new Date()),
        text: string
      });
    }
  }
});
