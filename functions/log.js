import store from '../src/store';

export default function(text) {
  store.commit('addMessage', text);
}
