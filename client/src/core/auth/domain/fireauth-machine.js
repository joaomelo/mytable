import { FireauthMachine } from '@joaomelo/fireauth-machine';
import { fireauth } from '__cli/core/firebase';

let fireauthMachine;

function initFireauthMachine (appService) {
  fireauthMachine = new FireauthMachine(fireauth);
  fireauthMachine.subscribe(({ user, status }) => {
    if (!user || status === 'UNSOLVED') return;

    const event = (status === 'SIGNIN' && !user.emailVerified) ? 'UNVERIFIED' : status;
    appService.send(event);
  });
}

export { fireauthMachine, initFireauthMachine };
