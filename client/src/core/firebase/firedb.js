import { loader } from '__cli/core/loader';
import { getFireapp } from './fireapp';

let firedb;

async function getFiredb () {
  if (!firedb) {
    loader.start();

    const fireapp = await getFireapp();

    await import(/* webpackChunkName: "firebase" */ 'firebase/firestore');
    firedb = fireapp.firestore();

    loader.stop();
  }

  return firedb;
}

export { getFiredb };
