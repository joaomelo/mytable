import { FireauthMachine } from '@joaomelo/fireauth-machine';
import { fireauth } from '__cli/core/services';

let fireauthMachine;

function initFireauthMachine () {
  fireauthMachine = new FireauthMachine(fireauth);
}

export { fireauthMachine, initFireauthMachine };
