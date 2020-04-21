import { loader } from '__cli/core/loader';
import { getFireapp } from './fireapp';

let fireauth;

async function getFireauth () {
  if (!fireauth) {
    loader.start();

    const fireapp = await getFireapp();

    await import(/* webpackChunkName: "firebase" */ 'firebase/auth');
    fireauth = fireapp.auth();

    loader.stop();
  }

  return fireauth;
}

export { getFireauth };
