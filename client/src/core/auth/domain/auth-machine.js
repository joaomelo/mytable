import { FireauthMachine } from '@joaomelo/fireauth-machine';
import { loader } from '__cli/core/loader';
import { getFireauth } from '__cli/core/firebase';

let fireauthMachine;
const authState = {
  status: 'UNSOLVED'
};

async function getFireauthMachine () {
  if (!fireauthMachine) {
    loader.start();
    const fireauth = await getFireauth();
    fireauthMachine = new FireauthMachine(fireauth);
    fireauthMachine.subscribe(({ status }) => {
      if (authState.status === 'UNSOLVED' && status !== 'UNSOLVED') {
        loader.stop();
      }
      authState.status = status;
    });
  }
  return fireauthMachine;
}

export { getFireauthMachine, authState };
