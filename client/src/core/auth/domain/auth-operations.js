import { fireauth } from '__cli/core/firebase';
import { loader } from '__cli/core/loader';

function signUp (credentials) {
  const { email, password } = credentials;
  loader.start();
  return fireauth.createUserWithEmailAndPassword(email, password)
    .then(() => sendEmailVerification())
    .catch(error => error)
    .finally(() => loader.stop());
}

function sendEmailVerification () {
  loader.start();
  return fireauth.currentUser.sendEmailVerification()
    .then(() => {
      return {
        isSuccess: true,
        message: 'email successfully sent'
      };
    })
    .catch(error => error)
    .finally(() => loader.stop());
}

function signIn (credentials) {
  const { email, password } = credentials;
  loader.start();
  return fireauth.signInWithEmailAndPassword(email, password)
    .catch(error => error)
    .finally(() => loader.stop());
}

function logout () {
  loader.start();
  return fireauth.signOut().finally(() => loader.stop());
}

export { signUp, sendEmailVerification, signIn, logout };
