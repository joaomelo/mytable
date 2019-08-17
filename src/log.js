import store from './store';

export default function(text) {
  store.commit('addMessage', text);
}
