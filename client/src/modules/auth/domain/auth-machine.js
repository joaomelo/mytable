import Vue from 'vue';
import { FireauthMachine } from '@joaomelo/fireauth-machine';
import { fireauth, firedb } from '__cli/core/firebase';

const profilesRef = firedb.collection('profiles');
const authMachine = new FireauthMachine(fireauth, { pushTo: profilesRef });
Vue.observable(authMachine); // make it reactive

export { authMachine };
