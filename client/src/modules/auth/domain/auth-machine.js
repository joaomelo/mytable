import Vue from 'vue';
import { FireauthMachine } from '@joaomelo/fireauth-machine';
import { fireauth, firedb } from '__cli/core/firebase';

const fireauthMachine = new FireauthMachine(fireauth, { pushTo: firedb.collection('profiles') });
Vue.observable(fireauthMachine); // make it reactive

export { fireauthMachine };
