import Vue from 'vue';
import Vuex from 'vuex';
import { fireDb, fireLogout } from './firebase';

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
    user: null,
    logs: []
  },
  getters: {
    getUser(state) {
      return state.user;
    },
    isLoggedIn(state) {
      return state.user != null;
    }
  },
  mutations: {
    setLogs(state, newLogs) {
      state.logs = newLogs;
    },
    setUser(state, newUser) {
      state.user = newUser;
    }
  },
  actions: {
    async logout({ commit }) {
      await fireLogout();
      commit('setUser', null);
    },
    setLogs({ commit, getters }) {
      fireDb
        .collection('logs')
        .orderBy('when', 'desc')
        .limit(100)
        .onSnapshot(snapshot => {
          const logs = snapshot.docs.map(log => {
            const data = { id: log.id, ...log.data() };
            return {
              id: data.id,
              when: data.when && prettyDate(data.when.toDate()),
              msg: data.msg
            };
          });
          commit('setLogs', logs);
        });
    }
  }
});
