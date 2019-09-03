import Vue from 'vue';
import Vuex from 'vuex';
import moment from 'moment';
import { fireDb } from './firebase';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    logs: []
  },
  getters: {
    getUser() {
      return state.user;
    },
    isLoggedIn(state) {
      return state.user != null;
    }
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setLogs(state, newLogs) {
      state.logs = newLogs;
    }
  },
  actions: {
    setLogs({ commit }) {
      fireDb
        .collection('logs')
        .orderBy('when', 'desc')
        .limit(50)
        .onSnapshot(snapshot => {
          const logs = snapshot.docs.map(doc => {
            const data = { id: doc.id, ...doc.data() };
            const when = data.when ? data.when.toDate() : new Date();
            return {
              id: data.id,
              when: moment(when).format('DD-MM HH:mm:ss'),
              msg: data.msg
            };
          });
          commit('setLogs', logs);
        });
    }
  }
});
