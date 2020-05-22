import { firebase } from '__cli/core/firebase';
import { authStore } from './auth-store';
import { sendEmailVerification } from './auth-operations';

function updateEmail (newEmail, password) {
  const oldEmail = authStore.state.user.email;
  const success = false; // means no error message

  if (newEmail === oldEmail) return Promise.resolve('new email must differ from current');
  if (!password) return Promise.resolve('must provide password');

  const credential = firebase.auth.EmailAuthProvider.credential(oldEmail, password);
  const updateEmailPromise = authStore.state.user.reauthenticateWithCredential(credential)
    .then(({ user }) => user.updateEmail(newEmail))
    .then(() => sendEmailVerification())
    .then(() => success)
    .catch(error => error.message);

  return updateEmailPromise;
}

export { updateEmail };
