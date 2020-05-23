import { firebase } from '__cli/core/firebase';
import { authStore } from './auth-store';
import { sendEmailVerification } from './auth-operations';

function updateEmail (newEmail, password) {
  const user = authStore.state.user;
  const currentEmail = user.email;
  const success = false; // means no error message

  if (newEmail === currentEmail) return Promise.resolve('new email must differ from current');
  if (!password) return Promise.resolve('must provide current password to confirm');

  const updateEmailPromise = reauthenticate(user, password)
    .then(({ user }) => user.updateEmail(newEmail))
    .then(() => sendEmailVerification())
    .then(() => success)
    .catch(error => error.message);

  return updateEmailPromise;
}

function updatePassword (newPassword, password) {
  const user = authStore.state.user;
  const success = false; // means no error message

  if (newPassword === password) return Promise.resolve('new password must differ from current');
  if (!password) return Promise.resolve('must provide current password to confirm');

  const updatePasswordPromise = reauthenticate(user, password)
    .then(({ user }) => user.updatePassword(newPassword))
    .then(() => success)
    .catch(error => error.message);

  return updatePasswordPromise;
}

function reauthenticate (user, password) {
  const credential = firebase.auth.EmailAuthProvider.credential(user.email, password);
  const reauthenticatePromise = authStore.state.user.reauthenticateWithCredential(credential);
  return reauthenticatePromise;
}

export { updateEmail, updatePassword };
