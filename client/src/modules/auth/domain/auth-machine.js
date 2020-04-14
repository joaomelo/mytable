import Vue from 'vue';
import { FireauthMachine } from '@joaomelo/fireauth-machine';
import { fireauth } from '__cli/core/firebase';

const fireauthMachine = new FireauthMachine(fireauth);
Vue.observable(fireauthMachine); // make it reactive

export { fireauthMachine };
